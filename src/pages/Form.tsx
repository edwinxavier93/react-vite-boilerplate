import ReactHookForm from "../components/ReactHookForm";
import { type FormSchema } from "../interface/form";

// const formSchema: FormSchema[] = Array.from({ length: 20 }, (_, sectionIndex) => ({
//   accordionName: `Section ${sectionIndex + 1}`,
//   fields: Array.from({ length: 20 }, (_, fieldIndex) => ({
//     fieldName: `field${sectionIndex + 1}_${fieldIndex + 1}`,
//     type: ["text", "email", "number", "checkbox"][fieldIndex % 4] as "text" | "email" | "number" | "checkbox",
//     defaultValue: fieldIndex % 4 === 3 ? false : "",
//     displayName: `Field ${sectionIndex + 1}-${fieldIndex + 1}`,
//     required: fieldIndex % 4 === 0,
//   })),
// }));

const formSchema: FormSchema[] = [
  {
    accordionName: "Patient Information",
    fields: [
      {
        fieldName: "patientId",
        type: "text",
        defaultValue: "",
        displayName: "Patient ID",
        required: true,
      },
      {
        fieldName: "firstName",
        type: "text",
        defaultValue: "",
        displayName: "First name",
        required: true,
      },
      {
        fieldName: "middleName",
        type: "text",
        defaultValue: "",
        displayName: "Middle name",
        required: true,
      },
      {
        fieldName: "lastName",
        type: "text",
        defaultValue: "",
        displayName: "Last name",
        required: true,
      },
      {
        fieldName: "socialSecurityNumber",
        type: "number",
        defaultValue: "",
        displayName: "Social Security Number",
        required: false,
      },
      {
        fieldName: "dob",
        type: "date",
        defaultValue: "",
        displayName: "Date of birth",
        required: false,
      },
      {
        fieldName: "gender",
        type: "select",
        defaultValue: "",
        displayName: "Gender",
        required: true,
        options: [
          {
            value: 'Male',
            label: 'Male'
          },
          {
            value: 'Female',
            label: 'Female'
          },
        ]
      }
    ]
  },
  {
    accordionName: "Facilites",
    fields: [
      {
        fieldName: "facility",
        type: "select",
        defaultValue: "",
        displayName: "Facility",
        required: true,
        options: [
          {
            value: 'Facility A',
            label: 'Facility A'
          },
          {
            value: 'Facility B',
            label: 'Facility B'
          },
          {
            value: 'Facility C',
            label: 'Facility C'
          }
        ]
      }
    ]
  },
  {
    accordionName: "Belonging Group",
    fields: [
      {
        fieldName: "bGroup",
        type: "select",
        defaultValue: "",
        displayName: "Group",
        required: true,
        options: [
          {
            value: 'Group A',
            label: 'Group A'
          },
          {
            value: 'Group B',
            label: 'Group B'
          },
          {
            value: 'Group C',
            label: 'Group C'
          }
        ]
      }
    ]
  },
  {
    accordionName: "Contact",
    fields: [
      { fieldName: "street", type: "select", defaultValue: "", displayName: "Street", required: false, options: [
        { value: "Main St", label: "Main St" },
        { value: "Broadway", label: "Broadway" },
        { value: "Elm St", label: "Elm St" }
      ] },
      { fieldName: "state", type: "select", defaultValue: "", displayName: "State", required: false, options: [
        { value: "NY", label: "New York", data: ["New York City", "Buffalo", "Rochester"] },
        { value: "CA", label: "California", data: ["Los Angeles", "San Francisco", "San Diego"] },
        { value: "IL", label: "Illinois", data: ["Chicago", "Springfield", "Naperville"] }
      ], watch: true },
      { fieldName: "city", type: "select", defaultValue: "", displayName: "City", required: false, options: [], dependsOn: 'state'},
      { fieldName: "zip", type: "text", defaultValue: "", displayName: "Zip", required: false },
      { fieldName: "phoneHome", type: "number", defaultValue: "", displayName: "Phone (Home)", required: false },
      { fieldName: "phoneDay", type: "number", defaultValue: "", displayName: "Phone (Day)", required: false },
      { fieldName: "phoneMobile", type: "number", defaultValue: "", displayName: "Phone (Mobile)", required: false },
      { fieldName: "emergencyContact", type: "textarea", defaultValue: "", displayName: "Emergency Contact", required: false }
    ]
  },
  {
    accordionName: "Patient Social",
    fields: [
      { fieldName: "maritalStatus", type: "select", defaultValue: "", displayName: "Marital Status", required: false, options: [
        { value: "single", label: "Single" },
        { value: "married", label: "Married" },
        { value: "divorced", label: "Divorced" }
      ] },
      { fieldName: "occupation", type: "text", defaultValue: "", displayName: "Occupation", required: false },
      { fieldName: "education", type: "text", defaultValue: "", displayName: "Education", required: false },
      { fieldName: "race", type: "text", defaultValue: "", displayName: "Race", required: false },
      { fieldName: "ethnicity", type: "text", defaultValue: "", displayName: "Ethnicity", required: false },
      { fieldName: "religion", type: "text", defaultValue: "", displayName: "Religion", required: false },
      { fieldName: "birthPlace", type: "text", defaultValue: "", displayName: "Birth Place", required: false },
      { fieldName: "preferredLanguage", type: "text", defaultValue: "", displayName: "Preferred Language", required: false }
    ]
  },
  {
    accordionName: "Father Social",
    fields: [
      { fieldName: "maritalStatus", type: "select", defaultValue: "", displayName: "Marital Status", required: false, options: [
        { value: "single", label: "Single" },
        { value: "married", label: "Married" },
        { value: "divorced", label: "Divorced" }
      ] },
      { fieldName: "occupation", type: "text", defaultValue: "", displayName: "Occupation", required: false },
      { fieldName: "education", type: "text", defaultValue: "", displayName: "Education", required: false },
      { fieldName: "race", type: "text", defaultValue: "", displayName: "Race", required: false },
      { fieldName: "ethnicity", type: "text", defaultValue: "", displayName: "Ethnicity", required: false },
      { fieldName: "religion", type: "text", defaultValue: "", displayName: "Religion", required: false },
      { fieldName: "birthPlace", type: "text", defaultValue: "", displayName: "Birth Place", required: false },
      { fieldName: "preferredLanguage", type: "text", defaultValue: "", displayName: "Preferred Language", required: false }
    ]
  },
  {
    accordionName: "Primary Physician",
    fields: [
      { fieldName: "firstName", type: "select", defaultValue: "", displayName: "First Name", required: false, options: [
        { value: "Dr. Smith", label: "Dr. Smith", lastName: "Smith", asId: "AS123", address: "123 Main St", phone: "123-456-7890", fax: "123-456-7891" },
        { value: "Dr. Johnson", label: "Dr. Johnson", lastName: "Johnson", asId: "AS124", address: "456 Elm St", phone: "987-654-3210", fax: "987-654-3211" },
        { value: "Dr. Brown", label: "Dr. Brown", lastName: "Brown", asId: "AS125", address: "789 Oak St", phone: "555-555-5555", fax: "555-555-5556" }
      ], watch: true },
      { fieldName: "lastName", type: "text", defaultValue: "", displayName: "Last Name", required: false, disabled: true, dependsOn: "firstName.lastName", filter: "lastName" },
      { fieldName: "asId", type: "text", defaultValue: "", displayName: "AS ID#", required: false, disabled: true, dependsOn: "firstName.asId", filter: "asId" },
      { fieldName: "address", type: "text", defaultValue: "", displayName: "Address", required: false, disabled: true, dependsOn: "firstName.address", filter: "address" },
      { fieldName: "phone", type: "text", defaultValue: "", displayName: "Phone", required: false, disabled: true, dependsOn: "firstName.phone", filter: "phone" },
      { fieldName: "fax", type: "text", defaultValue: "", displayName: "Fax", required: false, disabled: true, dependsOn: "firstName.fax", filter: "fax" }
    ]
  },
  {
    accordionName: "Secondary Physician",
    fields: [
      { fieldName: "firstName", type: "select", defaultValue: "", displayName: "First Name", required: false, options: [
        { value: "Dr. Smith", label: "Dr. Smith", lastName: "Smith", asId: "AS123", address: "123 Main St", phone: "123-456-7890", fax: "123-456-7891" },
        { value: "Dr. Johnson", label: "Dr. Johnson", lastName: "Johnson", asId: "AS124", address: "456 Elm St", phone: "987-654-3210", fax: "987-654-3211" },
        { value: "Dr. Brown", label: "Dr. Brown", lastName: "Brown", asId: "AS125", address: "789 Oak St", phone: "555-555-5555", fax: "555-555-5556" }
      ] },
      { fieldName: "lastName", type: "text", defaultValue: "", displayName: "Last Name", required: false, disabled: true },
      { fieldName: "asId", type: "text", defaultValue: "", displayName: "AS ID#", required: false, disabled: true },
      { fieldName: "address", type: "text", defaultValue: "", displayName: "Address", required: false, disabled: true },
      { fieldName: "phone", type: "text", defaultValue: "", displayName: "Phone", required: false, disabled: true },
      { fieldName: "fax", type: "text", defaultValue: "", displayName: "Fax", required: false, disabled: true }
    ]
  },
  {
    accordionName: "Teritary Physician",
    fields: [
      { fieldName: "firstName", type: "select", defaultValue: "", displayName: "First Name", required: false, options: [
        { value: "Dr. Smith", label: "Dr. Smith" },
        { value: "Dr. Johnson", label: "Dr. Johnson" },
        { value: "Dr. Brown", label: "Dr. Brown" }
      ] },
      { fieldName: "lastName", type: "text", defaultValue: "", displayName: "Last Name", required: false, disabled: true },
      { fieldName: "asId", type: "text", defaultValue: "", displayName: "AS ID#", required: false, disabled: true },
      { fieldName: "address", type: "text", defaultValue: "", displayName: "Address", required: false, disabled: true },
      { fieldName: "phone", type: "text", defaultValue: "", displayName: "Phone", required: false, disabled: true },
      { fieldName: "fax", type: "text", defaultValue: "", displayName: "Fax", required: false, disabled: true }
    ]
  },
  {
    accordionName: "Insurance",
    fields: [
      { fieldName: "insuranceCompany", type: "text", defaultValue: "", displayName: "Insurance Company", required: false },
      { fieldName: "policyId", type: "text", defaultValue: "", displayName: "Policy ID", required: false },
      { fieldName: "insured", type: "text", defaultValue: "", displayName: "Insured", required: false },
      { fieldName: "group", type: "text", defaultValue: "", displayName: "Group", required: false },
      { fieldName: "authorization", type: "text", defaultValue: "", displayName: "Authorization", required: false }
    ]
  },
  {
    accordionName: "Guarantor",
    fields: [
      { fieldName: "name", type: "text", defaultValue: "", displayName: "Name", required: false },
      { fieldName: "address", type: "text", defaultValue: "", displayName: "Address", required: false },
      { fieldName: "sex", type: "select", defaultValue: "", displayName: "Sex", required: false, options: [
        { value: "male", label: "Male" },
        { value: "female", label: "Female" },
        { value: "other", label: "Other" }
      ] },
      { fieldName: "homePhone", type: "text", defaultValue: "", displayName: "Home Phone", required: false },
      { fieldName: "relationToPatient", type: "text", defaultValue: "", displayName: "Patient Relation to Guarantor", required: false }
    ]
  },
  {
    accordionName: "Comments",
    fields: [
      { fieldName: "comments", type: "textarea", defaultValue: "", displayName: "Comments", required: false }
    ]
  }
];

const FormPage = () => {
  return <ReactHookForm schema={formSchema} />;
};

export default FormPage;
