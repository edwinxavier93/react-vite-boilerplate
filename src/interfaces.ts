export interface FormSchema {
  accordionName: string;
  fields: {
    fieldName: string;
    type: "text" | "email" | "number" | "checkbox";
    defaultValue: string | number | boolean;
    displayName: string;
    required?: boolean;
  }[];
}