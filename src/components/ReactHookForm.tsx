import { Accordion, AccordionItem, Button, Checkbox, TextInput } from "@carbon/react";
import { useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { type FormSchema } from "../interfaces";

interface ReactHookFormProps {
  schema: FormSchema[];
}

interface FormData {
  [key: string]: string | number | boolean;
}

interface FieldSectionProps {
  fieldName: string;
  type: "text" | "email" | "number" | "checkbox";
  defaultValue: string | number | boolean;
  displayName: string;
  required?: boolean;
}

export default function ReactHookForm(props: ReactHookFormProps) {
  const { schema } = props;
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const [isOpen, setIsOpen] = useState<string>('');

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onSubmit = useCallback(handleSubmit(data => console.log(data)), []);

  const handleAccordionClick = useCallback((section: string, isOpen: boolean) => {
    if (isOpen) {
      setIsOpen(section);
    } else {
      setIsOpen('');
    }
  }, []);

  const FieldSection = (fieldData: FieldSectionProps, register: ReturnType<typeof useForm>['register']) => {
    if (fieldData.type === 'text' || fieldData.type === 'email' || fieldData.type === 'number') {
      return <TextInput 
        id={fieldData.fieldName} 
        labelText={fieldData.displayName} 
        {...register(fieldData.fieldName, { required: fieldData.required })} 
      />;
    } else if (fieldData.type === 'checkbox') {
      return <Checkbox id={fieldData.fieldName} {...register(fieldData.fieldName)} labelText="Check me" />;
    }
  };

  const formSection = useMemo(() =>
    schema.map((section) => (
      <Accordion key={section.accordionName} className="mb-4">
        <AccordionItem
          title={section.accordionName}
          open={isOpen === section.accordionName}
          onHeadingClick={({ isOpen }) => handleAccordionClick(section.accordionName, isOpen)}
        >
          {isOpen === section.accordionName && section.fields.map((field) => (
            <div key={field.fieldName} className="mb-3">
              {FieldSection(field, register)}
              {errors[field.fieldName] && (
                <span className="text-red-600">
                  This field is required
                </span>
              )}
            </div>
          ))}
        </AccordionItem>
      </Accordion>
    )), [schema, isOpen, handleAccordionClick, register, errors]);

  return (
    <form onSubmit={onSubmit}>
      {formSection}
      <Button type="submit" kind="primary">
        Submit
      </Button>
    </form>
  );
}