import React, { useState } from "react";
import { Modal, Button, Input, Select, Checkbox, Table, Form } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import DetailSection from "../base/DetailSection";
import "./customWorkList.scss";
import ascIcon from "../../../../assets/svg/asc.svg";
import lockIcon from "../../../../assets/svg/lock.svg";


const { Option } = Select;

interface Props {
  visible: boolean;
  onCancel: () => void;
  onCreate: () => void;
  customWorkListData?: CustomWorkListFormI | null;
  editMode?: boolean;
}

// locked: boolean; tells that this particular field is locked i.e. name cannot be changed, also not deletable

interface WorkListFieldsI {
  id: string | number;
  name: string;
  sort: boolean;
  sortBy: "asc" | "desc",
  locked: boolean;
}

interface CustomWorkListFormI {
  name: string;
  group: string;
  dateRange: string;
  useArchiveDB: boolean;
  fields: WorkListFieldsI[]
}

const InputSuffix = (
  <EditOutlined size={12} style={{ color: "#0071E3" }} />
);


const CreateCustomWorKListModal: React.FC<Props> = ({
  visible,
  onCancel,
  onCreate,
  customWorkListData = null,
  editMode = false,
}) => {
  const defaultCustomWorkListValues: CustomWorkListFormI = {
    name: "My Worklist",
    group: "",
    dateRange: "",
    useArchiveDB: false,
    fields: [
      {
        id: 0,
        name: "Patient ID",
        sort: true,
        sortBy: "asc",
        locked: true
      },
      {
        id: 1,
        name: "MRN",
        sort: false,
        sortBy: "asc",
        locked: true
      },
      {
        id: 2,
        name: "First Name",
        sort: false,
        sortBy: "asc",
        locked: false
      },
      {
        id: 3,
        name: "Last Name",
        sort: false,
        sortBy: "asc",
        locked: false
      }
    ]
  };

  const [customWorkListForm, setCustomWorkListForm] = useState<CustomWorkListFormI>(editMode ? customWorkListData as CustomWorkListFormI : defaultCustomWorkListValues);

  const changeFieldInForm = (field, value, id) => {
    setCustomWorkListForm(prev => ({
      ...prev,
      fields: prev.fields.map(each => {
        if(each.id !== id) return each;
        else return {
          ...each,
          [field]: value
        }
      })
    }));
  }

  return (
    <Modal
      styles={{ content: { padding: "18px 16px" } }}
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={1330}
      closable={true}
      centered={true}
    >
      <h2 className="text-lg font-bold mb-4">Create Custom Worklist</h2>

      <DetailSection title="Basic Info">
        <div className="flex w-full py-2.5 gap-2.5">
          <Form
            name="basic"
            className="flex gap-2.5"
            initialValues={customWorkListForm}
            layout="vertical"
            wrapperCol={{ span: 21 }}
            onValuesChange={(values) => setCustomWorkListForm((val) => ({...val, ...values}))}
            autoComplete="off"
          >
            <Form.Item
              className="min-w-[220px] pl-2.5 mb-0!"
              label="Name of the worklist"
              name="name"
              rules={[{ required: true, message: 'Please enter the name!' }]}
            >
              <Input size="large" placeholder="Enter worklist name" />
            </Form.Item>

            <Form.Item
              className="min-w-[220px] pl-2.5 mb-0!"
              label="Worklist Group"
              name="group"
              rules={[{ required: true, message: 'Please select the group!' }]}
            >
              <Select size="large">
                <Option value="Orders">Orders</Option>
                <Option value="Visits">Visits</Option>
              </Select>
            </Form.Item>

            <Form.Item className="min-w-[220px] pl-2.5 mb-0!" label="Date Range" name="dateRange">
              <Select size="large">
                <Option value="Last 30 days">Last 30 days</Option>
                <Option value="Last 7 days">Last 7 days</Option>
              </Select>
            </Form.Item>
          </Form>
          <div className="flex flex-col justify-center">
            <span>
              <Checkbox size="large" checked={customWorkListForm.useArchiveDB} onChange={(e) => {
                setCustomWorkListForm((val) => ({...val, useArchiveDB: e.target.checked}))
              }}>Use archive DB</Checkbox>
            </span>
          </div>
        </div>
      </DetailSection>

      <DetailSection title="Displayed Fields" actionName="Add Column(s)" onActionClick={() => {
        setCustomWorkListForm((prev) => ({
          ...prev,
          fields: [...prev.fields, {
            id: customWorkListForm.fields.length + 1,
            name: "Field Name",
            sort: false,
            sortBy: "asc",
            locked: false
          }]
        }));
      }}>
        <div className="gap-2 px-2 py-2.5 w-full" style={{ overflow: 'scroll' }}>
          <div className="flex border-1 border-[#9E9E9E] bg-[#0000001A] rounded" style={{ width: "fit-content" }}>
            {customWorkListForm.fields.map(
              (field, index) => (
                <section
                  key={field.name}
                  className="flex flex-col gap-2 border-r border-[#9E9E9E] px-3.5 py-3"
                >
                  <Input
                    rootClassName="font-medium w-[132px]! h-8"
                    placeholder="Basic usage" value={field.name}
                    prefix={<img src={lockIcon} alt="Lock" />}
                    suffix={InputSuffix}
                    readOnly={true}
                    onChange={(e) => changeFieldInForm("name", e.target.value, field.id)}
                  />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Checkbox style={{ fontSize: "13px" }} size="large" checked={field.sort} onChange={(e) => changeFieldInForm("sort", e.target.checked, field.id)}>Sort</Checkbox>
                      <Button onClick={() => changeFieldInForm("sortBy", field.sortBy === "asc" ? "desc" : "asc", field.id)} style={{ height:"16px", gap: 0, padding: "0 5px", margin: 0 }} size="small" color="default" variant={field.sortBy === "asc" ? "solid" : "outlined"}>
                        <span className="text-[11px]">A</span>
                        <img className="ml-[3px] text-gray-500" src={ascIcon}  alt="ASC" />
                      </Button>
                    </div>
                    <i><DeleteOutlined color="red" /></i>
                  </div>
                </section>
              )
            )}
          </div>
        </div>
      </DetailSection>

      <DetailSection title="Grouping Criteria" actionName="Add Column(s)">
        <Table
          size="small"
          bordered={true}
          pagination={false}
          styles={{  }}
          columns={[
            { title: null, dataIndex: "delete", render: () => <i className="cursor-pointer"><DeleteOutlined color="red" /></i> },
            { title: "Group", dataIndex: "group", render: () => <Checkbox /> },
            {
              title: "Logical",
              dataIndex: "logical",
              render: () => (
                <Select defaultValue="AND" style={{ width: 100 }}>
                  <Option value="AND">AND</Option>
                  <Option value="OR">OR</Option>
                </Select>
              ),
            },
            { title: "Field", dataIndex: "field", render: () => <Input /> },
            {
              title: "Operator",
              dataIndex: "operator",
              render: () => (
                <Select defaultValue="=" style={{ width: 100 }}>
                  <Option value="=">=</Option>
                  <Option value="Contains">Contains</Option>
                </Select>
              ),
            },
            { title: "Value", dataIndex: "value", render: () => <Input /> },
          ]}
          dataSource={[{ key: "1" }, { key: "2" }]}
        />
      </DetailSection>

      <div className="flex mt-3.5 h-12 items-center justify-end gap-2.5">
        <Button color="primary" variant="outlined" size="large" style={{ marginBottom: 0 }} onClick={onCancel}>
          Cancel
        </Button>
        <Button
          size="large"
          type="primary"
          style={{ marginBottom: 0 }}
          onClick={onCreate}
        >
          Create Custom Worklist
        </Button>
      </div>
    </Modal>
  );
};

export default CreateCustomWorKListModal;
