interface menuConfigProps {
  type?: "group" | "divider";
  icon?: any;
  label?: string;
  key?: string;
  children?: menuConfigProps[];
}

export const menuConfig: menuConfigProps[] = [
  {
    type: 'group',
    label: "MENU",
    children: [
      { key: "worklist", label: "Worklist" },
      { key: "patient-management", label: "Patient Management" },
    ],
  },
  {
    type: 'group',
    label: "ADMIN",
    children: [
      { key: "maintenance", label: "Maintenance" },
      { key: "tenant-config", label: "Tenant Config" },
      { key: "form-config", label: "Form Config" },
    ],
  },
];
