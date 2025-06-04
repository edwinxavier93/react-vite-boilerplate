import ReactHookForm from "../components/ReactHookForm";
import { type FormSchema } from "../interfaces";

const formSchema: FormSchema[] = Array.from({ length: 20 }, (_, sectionIndex) => ({
  accordionName: `Section ${sectionIndex + 1}`,
  fields: Array.from({ length: 20 }, (_, fieldIndex) => ({
    fieldName: `field${sectionIndex + 1}_${fieldIndex + 1}`,
    type: ["text", "email", "number", "checkbox"][fieldIndex % 4] as "text" | "email" | "number" | "checkbox",
    defaultValue: fieldIndex % 4 === 3 ? false : "",
    displayName: `Field ${sectionIndex + 1}-${fieldIndex + 1}`,
    required: fieldIndex % 4 === 0,
  })),
}));

const FormPage = () => {
  return <ReactHookForm schema={formSchema} />;
};

export default FormPage;
