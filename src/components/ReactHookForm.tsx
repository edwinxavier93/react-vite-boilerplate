import type { CollapseProps } from 'antd';
import { Button, Checkbox, Collapse, DatePicker, Input, InputNumber, Select } from 'antd';
import dayjs from 'dayjs';
import { useCallback, useEffect, useMemo, useState } from "react";
import { Controller, useForm, type ControllerRenderProps } from "react-hook-form";
import { type FormSchema } from "../interface/form";

interface ReactHookFormProps {
  schema: FormSchema[];
}

interface FormData {
  [key: string]: string | number | boolean | null | undefined;
}

interface Options {
  label: string;
  value: string;
}

interface DynamicFieldState {
  [key: string]: Options[] | string;
}

interface PrefixedValues {
  name: string;
  filter?: string;
  type: FormSchema['fields'][0]['type'];
}

const setDateValue = (fieldInstance: ControllerRenderProps, dateString: string) => {
  fieldInstance.onChange(dateString);
};

const splitByIdentifier = (key: string, identifier: string): string[] => {
  return key.includes(`${identifier}`) ? key.split(`${identifier}`) : [key];
};

const getValuesByPrefix = (obj: Record<string, PrefixedValues>, prefix: string): PrefixedValues[] => {
  return Object.keys(obj)
    .filter(key => key === prefix || key.startsWith(`${prefix}.`)) // Match exact prefix or prefix with `.`
    .map(key => obj[key]);
};

export default function ReactHookForm(props: ReactHookFormProps) {
  const { schema } = props;
  const { control, watch, setValue, handleSubmit, formState: { errors } } = useForm<FormData>();

  const [dynamicFieldState, setDynamicFieldState] = useState<DynamicFieldState>({});

  const getMatchedOptions = useCallback((sourceField: string, filterKey: string = 'data', value: string) => {
    if (sourceField && filterKey && value) {
      const keys: string[] = splitByIdentifier(filterKey, '.');
      let key = keys[0];
      if (keys.length > 1) {
        key = keys[1];
      }
      for (const section of schema) {
        for (const field of section.fields) {
          if (field.fieldName === sourceField && field.options?.length) {
            const matchedOptions = field.options.find(option => option.value === value);
            if (matchedOptions?.[key] && typeof matchedOptions[key] === 'string') {
              return matchedOptions[key] || '';
            } else if (matchedOptions?.[key] && typeof matchedOptions[key] === 'object') {
              const data: string[] = Array.isArray(matchedOptions[key]) ? matchedOptions[key] as string[] : [];
              if (data.length > 0) {
                return data.map(option => ({
                  label: option,
                  value: option,
                }));
              } else {
                return null;
              }
            }
          }
        }
      }
    }
    return null;
  }, [schema]);

  const memoizedFieldSection = useMemo(() => {
    return (fieldInstance: ControllerRenderProps, fieldData: FormSchema['fields'][0]) => {
      switch (fieldData.type) {
      case 'text':
      case 'email':
        return (
          <Input
            {...fieldInstance}
            type={fieldData.type}
            value={fieldInstance.value || fieldData.defaultValue}
            id={fieldData.fieldName}
            placeholder={fieldData.displayName}
            disabled={fieldData.disabled}
          />
        );
      case 'textarea':
        return (
          <Input.TextArea
            {...fieldInstance}
            value={fieldInstance.value || fieldData.defaultValue}
            id={fieldData.fieldName}
            placeholder={fieldData.displayName}
            autoSize={{ minRows: 3, maxRows: 6 }}
            disabled={fieldData.disabled}
          />
        )
      case 'number':
        return (
          <InputNumber
            {...fieldInstance}
            controls={false}
            style={{ width: '100%' }}
            placeholder={fieldData.displayName}
            disabled={fieldData.disabled}
          />
        );
      case 'checkbox':
        return (
          <Checkbox
            {...fieldInstance}
            checked={fieldInstance.value}
            disabled={fieldData.disabled}
          />
        );
      case 'date':
        return (
          <DatePicker {...fieldInstance}
            value={fieldInstance.value ? dayjs(fieldInstance.value) : null}
            onChange={(_, dateString) => setDateValue(fieldInstance, dateString as string)}
            style={{ width: '100%' }}
            placeholder={fieldData.displayName}
            disabled={fieldData.disabled}
          />
        );
      case 'select':
        return (
          <Select
            {...fieldInstance}
            options={dynamicFieldState[fieldData.fieldName] as Options[] || fieldData.options || []}
            placeholder={fieldData.displayName}
            disabled={fieldData.disabled}
            style={{ width: '100%' }}
          />
        );
      default:
        return <></>;
      }
    };
  }, [dynamicFieldState]);

  const FieldSection = useCallback((fieldInstance: ControllerRenderProps, fieldData: FormSchema['fields'][0]) => {
    return memoizedFieldSection(fieldInstance, fieldData);
  }, [memoizedFieldSection]);

  const dependantFields = useMemo(() => {
    const fields: Record<string, PrefixedValues> = {};
    schema.forEach(section => {
      section.fields.forEach(field => {
        if (field.dependsOn) {
          if (Array.isArray(field.dependsOn)) {
            field.dependsOn.forEach(dep => {
              fields[dep] = {
                name: field.fieldName,
                type: field.type,
                filter: field.dependsOn,
              };
            });
          } else {
            fields[field.dependsOn] = {
              name: field.fieldName,
              type: field.type,
              filter: field.dependsOn,
            };
          }
        }
      });
    });
    return fields;
  }, [schema]);

  const watchFields = useMemo(() =>
    schema.flatMap(section => section.fields.filter(field => field.watch).map(field => field.fieldName)), [schema]);

  useEffect(() => {
    const subscription = watch((value, { name = '', type }) => {
      if (type === 'change' && watchFields.includes(name)) {
        const fieldData = getValuesByPrefix(dependantFields, name);
        fieldData.forEach((datum: PrefixedValues) => {
          if (datum && datum.type === 'select') {
            const matchedOptions = getMatchedOptions(name, 'data', value[name] as string);
            setDynamicFieldState({
              ...dynamicFieldState,
              [datum.name]: Array.isArray(matchedOptions) ? matchedOptions as Options[]: []
            });
            setValue(datum.name, null);
          } else {
            const matchedOptions = getMatchedOptions(name, datum.filter, value[name] as string);
            setValue(datum.name, matchedOptions as string);
          }
        })
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, watchFields, getMatchedOptions, dependantFields, dynamicFieldState, setValue]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onSubmit = useCallback(handleSubmit(data => console.log(data)), []);

  const getItems: CollapseProps['items'] = useMemo(() => 
    schema.map(section => ({
      key: section.accordionName,
      label: section.accordionName,
      children: (
        <>
          {section.fields.map(field => (
            <div key={field.fieldName} className="mb-2">
              <Controller
                name={field.fieldName}
                control={control}
                render={({ field: fieldInstance }) => FieldSection(fieldInstance, field)}
                rules={{ required: field.required ? `${field.displayName} is required` : false }}
              />
              <span className='text-xs text-red-400'>{errors[field.fieldName]?.message}</span>
            </div>
          ))}
        </>
      ),
    })), [schema, control, errors, FieldSection]);

  const memoizedFormSection = useMemo(() => <Collapse
    accordion={true}
    items={getItems}
  />, [getItems]);

  return (
    <form onSubmit={onSubmit}>
      {memoizedFormSection}
      <Button onClick={onSubmit} className='mt-4'>Submit</Button>
    </form>
  );
}