import React from "react";

interface DetailSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  actionName?: string;
  onActionClick?: () => void;
}

const DetailSection: React.FC<DetailSectionProps> = ({
  title,
  children,
  actionName,
  onActionClick
}) => {
  return (
    <div className={"mb-4"}>
      <div className="flex justify-between items-center px-3 py-2 bg-[#C7C7C7] rounded-t-lg">
        <h3 className="font-semibold text-[13px] text-black">{title}</h3>
        {actionName && (
          <span onClick={onActionClick} className="font-semibold text-[#0071E3] cursor-pointer hover:text-[#0071E390] text-[13px]">
            {actionName}
          </span>
        )}
      </div>
      <div className="px-1.5 py-2 bg-[#E7E7E7] rounded-b-lg">{children}</div>
    </div>
  );
};

export default DetailSection;
