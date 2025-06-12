import type React from "react";
import { useState } from "react";
import { theme } from "antd";

export interface TabListItemInterface {
  label: string;
  key: string | number;
}


const TabList: React.FC<{
  items: TabListItemInterface[];
  onChange: (item: TabListItemInterface) => void;
}> = ({ items, onChange }) => {
  const { token } = theme.useToken();

  const [active, setActive] = useState<TabListItemInterface | null>(items[0]);
  const onTabClick = (item: TabListItemInterface) => {
    if (active && item.key === active.key) return;
    setActive(item);
    onChange(item);
  };

  return (
    <div className="flex gap-2.5">
      {items.map((item) => (
        <div
          key={item.key}
          className={`flex items-center justify-center px-4 py-1.5 cursor-pointer text-[13px] border-1 rounded-[90px] ${active?.key === item.key ? "text-white bg-black" : "text-black bg-white"}`}
          style={{ borderColor: token.colorPrimary, backgroundColor: active?.key === item.key ? token.colorPrimary : token.textWhite, color: active?.key === item.key ? token.textWhite : token.colorPrimary }}
          onClick={() => onTabClick(item)}
        >
          {item.label}
        </div>
      ))}
    </div>
  );
};

export default TabList;
