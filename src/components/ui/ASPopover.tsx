import { Popover } from "antd";
import { PlusOutlined, SettingOutlined } from "@ant-design/icons";

const ICONS = {
  plus: <PlusOutlined className="mr-1" />,
  setting: <SettingOutlined className="mr-1" />,
};

const ASPopover = ({ items = [], onClick, children }) => {
  const mainItems = items.filter((item) => item.type !== "group");
  const groups = items.filter((item) => item.type === "group");

  const BG_HOVER = "gray-100";
  const BORDER_COLOR = "#00000033";

  const content = (
    <div className="min-w-[210px] text-xs">
      <ul className="w-full">
        {mainItems.map((item) => (
          <li
            key={item.key}
            className={`w-full h-[32px] px-3 py-2 hover:bg-[${BG_HOVER}] cursor-pointer`}
            onClick={() => onClick?.(item)}
          >
            {item.label}
          </li>
        ))}
      </ul>

      {groups.map((group, groupIdx) => (
        <div
          key={`group-${groupIdx}`}
          className={`flex mt-1 border-t`}
          style={{ borderColor: BORDER_COLOR }}
        >
          {group.children?.map((btn, btnIdx) => (
            <div
              key={btn.key}
              className={`w-[50%] h-[28px] px-2.5 py-1.5 font-medium hover:bg-[${BG_HOVER}] flex items-center justify-center text-xs ${
                btnIdx === 0 ? "border-r" : ""
              } cursor-pointer`}
              style={{ borderColor: BORDER_COLOR }}
              onClick={() => onClick?.(btn)}
            >
              {ICONS[btn.icon] || null}
              {btn.label}
            </div>
          ))}
        </div>
      ))}
    </div>
  );

  return (
    <Popover
      styles={{
        body: {
          boxShadow: "none",
          padding: 0,
          border: `1px solid #000000`,
          borderRadius: 4,
        },
      }}
      arrow={false}
      content={content}
      trigger="click"
      placement="bottomLeft"
    >
      {children}
    </Popover>
  );
};

export default ASPopover;
