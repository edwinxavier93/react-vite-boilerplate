import TabList, { type TabListItemInterface } from "./base/TabList";
import ASPopover from "../../../components/ui/ASPopover.tsx";
import { Button, Space, theme } from "antd";

interface WorkListHeaderI {
  rightContent: React.ReactNode;
  tabItems: TabListItemInterface[];
  onTabClick: (item: TabListItemInterface) => void;
  onDropDownMenuClick: (item: TabListItemInterface) => void;
}

const dropDownItems = [
  { key: "customworklist", label: "Custom Worklist" },
  { key: "priority", label: "Priority List" },
  { key: "attention", label: "Needs Attention" },
  {
    type: "group",
    children: [
      { key: "create", label: "Create New", icon: "plus" },
      { key: "manage", label: "Manage", icon: "setting" },
    ],
  },
];

const WorkListHeader: React.FC<WorkListHeaderI> = ({
  rightContent = null,
  tabItems = [],
  onTabClick,
  onDropDownMenuClick,
}) => {
  const { token } = theme.useToken();

  return (
    <div className="flex w-full bg-white h-[58px] pl-3 pr-5 py-[13px] items-center justify-between">
      <div className="flex gap-2.5 h-full items-center">
        <TabList items={tabItems} onChange={onTabClick} />
        <div className="h-[27px] w-[1px]" style={{ backgroundColor: token.borderLight }}></div>
        <ASPopover items={dropDownItems} onClick={onDropDownMenuClick}>
          <Button color="primary" variant="outlined" style={{ marginBottom: 0 }}>
            <Space>My Worlist</Space>
          </Button>
        </ASPopover>
      </div>
      <div className="flex items-center">{rightContent}</div>
    </div>
  );
};

export default WorkListHeader;
