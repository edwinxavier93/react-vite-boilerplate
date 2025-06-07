export interface FormSchema {
  accordionName: string;
  fields: {
    fieldName: string;
    type: "text" | "email" | "number" | "checkbox" | "date" | "select" | "textarea" | "datetime" | "time";
    defaultValue: string | number | boolean;
    displayName: string;
    required?: boolean;
    options?: {
      [key: string]: string | number | boolean | string[];
    }[];
    disabled?: boolean;
    filter?: string;
    watch?: boolean;
    dependsOn?: string;
  }[];
}