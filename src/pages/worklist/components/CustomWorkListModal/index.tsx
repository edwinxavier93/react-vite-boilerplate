import React, { useState } from "react";
import { Modal, Button, Input, Select, Checkbox, Table } from "antd";
import DetailSection from "../base/DetailSection";

const { Option } = Select;

interface Props {
  visible: boolean;
  onCancel: () => void;
  onCreate: () => void;
  customWorkListData?: any;
  editMode?: boolean;
}

const CreateCustomWorKListModal: React.FC<Props> = ({
  visible,
  onCancel,
  onCreate,
  customWorkListData = null,
  editMode = false,
}) => {
  const [customWorkListForm, setCustomWorkListForm] = useState();
  return (
    <Modal
      styles={{ content: { padding: "18px 16px" } }}
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={1330}
      closable
      centered
    >
      <h2 className="text-lg font-bold mb-4">Create Custom Worklist</h2>

      <DetailSection title="Basic Info">
        <div className="grid grid-cols-3 gap-4">
          <Input placeholder="Enter worklist name" />
          <Select defaultValue="Orders">
            <Option value="Orders">Orders</Option>
            <Option value="Visits">Visits</Option>
          </Select>
          <Select defaultValue="Last 30 days">
            <Option value="Last 30 days">Last 30 days</Option>
            <Option value="Last 7 days">Last 7 days</Option>
          </Select>
          <div className="col-span-3">
            <Checkbox>Use archive DB</Checkbox>
          </div>
        </div>
      </DetailSection>

      <DetailSection title="Displayed Fields" actionName="Add Column(s)">
        <div className="flex flex-wrap gap-2">
          {["Patient ID", "MRN", "First Name", "Last Name", "Column Name"].map(
            (col) => (
              <div
                key={col}
                className="flex items-center gap-2 border rounded px-2 py-1 bg-gray-50"
              >
                <span className="font-medium">{col}</span>
                <Button size="small">Sort</Button>
              </div>
            )
          )}
        </div>
      </DetailSection>

      <DetailSection title="Grouping Criteria" actionName="Add Column(s)">
        <Table
          size="small"
          bordered
          pagination={false}
          columns={[
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
        <Button size="large" style={{ marginBottom: 0 }} onClick={onCancel}>
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
