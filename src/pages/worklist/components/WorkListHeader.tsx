import TabList, { type TabListItemInterface } from "./base/TabList";
import WorklistDropPopover from "./base/WorklistDropPopover";

interface WorkListHeaderI {
  rightContent: React.ReactNode;
  tabItems: TabListItemInterface[];
  onTabClick: (item: TabListItemInterface) => void;
  onDropDownMenuClick: (item: TabListItemInterface) => void;
}

const WorkListHeader: React.FC<WorkListHeaderI> = ({
  rightContent = null,
  tabItems = [],
  onTabClick,
  onDropDownMenuClick,
}) => {
  return (
    <div className="flex w-full bg-white h-[58px] pl-3 pr-5 py-[13px] items-center justify-between">
      <div className="flex gap-2.5 h-full items-center">
        <TabList items={tabItems} onChange={onTabClick} />
        <div className="h-[27px] w-[1px] bg-[#00000033]"></div>
        <WorklistDropPopover onClick={onDropDownMenuClick} />
      </div>
      <div className="flex items-center">{rightContent}</div>
    </div>
  );
};

export default WorkListHeader;
