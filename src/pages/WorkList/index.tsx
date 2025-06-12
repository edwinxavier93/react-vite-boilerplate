import { Button, Checkbox } from "antd";
import WorkListHeader from "./components/WorkListHeader";
import { SettingOutlined } from "@ant-design/icons";
import { useState } from "react";
import type { TabListItemInterface } from "./components/base/TabList";
// import CreateCustomWorKListModal from "./components/customWorkListModal";

const items: TabListItemInterface[] = [
  {
    label: "Orders",
    key: "order",
  },
  {
    label: "Visits",
    key: "visit",
  },
  {
    label: "Images",
    key: "image",
  },
];

const WorkListPage = () => {
  const [visible, setVisible] = useState(false);
  const [defaultViewSelected, setDefaultViewSelected] = useState(true);

  const onViewChange = () => {
    setDefaultViewSelected(!defaultViewSelected);
  };

  const onTabClick = (item: TabListItemInterface) => {

  };

  const onDropDownMenuClick = (item: TabListItemInterface) => {
    if(item.key === "create") setVisible(true);
  };

  return (
    <div className="flex flex-1 w-full flex-col">
      <WorkListHeader
        tabItems={items}
        onTabClick={onTabClick}
        onDropDownMenuClick={onDropDownMenuClick}
        rightContent={
          <>
            <div className="mr-0.5">
              <Checkbox checked={defaultViewSelected} onChange={onViewChange}>
                Default View
              </Checkbox>
            </div>
            <Button
              style={{ marginBottom: 0 }}
              color="primary"
              variant="outlined"
            >
              <SettingOutlined className="mr-1" />
              Manage
            </Button>
          </>
        }
      />
      {/*<CreateCustomWorKListModal*/}
      {/*  visible={visible}*/}
      {/*  onCreate={() => {}}*/}
      {/*  onCancel={() => {}}*/}
      {/*/>*/}
    </div>
  );
};

export default WorkListPage;
