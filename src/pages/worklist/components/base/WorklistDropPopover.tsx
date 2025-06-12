import { Popover, Button, Space } from "antd";
import { SettingOutlined, PlusOutlined } from "@ant-design/icons";

const worklistItems = [
  { key: "customworklist", label: "customworklist-June" },
  { key: "priority", label: "My priority list" },
  { key: "attention", label: "Needs Attention" },
];

const WorklistDropPopover = ({ onClick }) => {
  const content = (
    <div className="w-50">
      <ul className="w-full">
        {worklistItems.map((item) => (
          <li
            key={item.key}
            className="w-full h-[32px] px-3 py-2 hover:bg-gray-100 cursor-pointer text-xs"
            onClick={() => onClick(item)}
          >
            {item.label}
          </li>
        ))}
      </ul>
      <div className="flex mt-1 border-t border-[#00000033]">
        <div
          className="w-[50%] h-[28px] px-2.5 py-1.5 font-medium hover:bg-gray-100 flex items-center justify-center text-xs border-r border-[#00000033] cursor-pointer"
          onClick={() => onClick({ key: "create" })}
        >
          <PlusOutlined className="mr-1" />
          Create New
        </div>
        <div
          className="w-[50%] h-[28px] px-2.5 py-1.5 font-medium hover:bg-gray-100 flex items-center justify-center text-xs cursor-pointer"
          onClick={() => onClick({ key: "manage" })}
        >
          <SettingOutlined className="mr-1" />
          Manage
        </div>
      </div>
    </div>
  );

  return (
    <Popover
      styles={{
        body: {
          boxShadow: "none",
          padding: 0,
          border: "1px solid #000000",
          borderRadius: 4,
        },
      }}
      arrow={false}
      content={content}
      trigger="click"
      placement="bottomLeft"
    >
      <Button style={{ marginBottom: 0 }}>
        <Space>My Worklist</Space>
      </Button>
    </Popover>
  );
};

export default WorklistDropPopover;
