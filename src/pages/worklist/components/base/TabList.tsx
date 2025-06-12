import type React from "react";
import { useState } from "react";

export interface TabListItemInterface {
  label: string;
  key: string | number;
}

const TabList: React.FC<{
  items: TabListItemInterface[];
  onChange: (item: TabListItemInterface) => void;
}> = ({ items, onChange }) => {
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
          className={`flex items-center justify-center px-4 py-1.5 cursor-pointer text-[13px] border-1 border-black rounded-[90px] ${active?.key === item.key ? "text-white bg-black" : "text-black bg-white"}`}
          onClick={() => onTabClick(item)}
        >
          {item.label}
        </div>
      ))}
    </div>
  );
};

export default TabList;
