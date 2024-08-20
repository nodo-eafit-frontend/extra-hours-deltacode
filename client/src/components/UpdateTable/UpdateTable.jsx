import React, { useState } from "react";
import { Input, Table, Button, Checkbox, message } from "antd";
import { findRegistryWithId } from "@services/findRegistryWithId";
import axios from "axios";
import "./UpdateTable.scss";

const { Search } = Input;

export const UpdateTable = () => {
  const [records, setRecords] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [editingRow, setEditingRow] = useState(null);

  const onSearch = async (id) => {
    try {
      const data = await findRegistryWithId(id);
      setRecords(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setRecords([]);
    }
  };

  const onSelectChange = (selectedRowKeys) => {
    selectedRowKeys(selectedRowKeys);
  };

  const saveEdit = async (record) => {
    try {
      await axios.put(
        `http://localhost:4000/extra-hour/${record.registry}`,
        record
      );
      MediaKeyMessageEvent.succes("Record updated successfully!");
    } catch (error) {
      console.error("Error updating record:", error);
      message.error("Failed to update record.");
    } finally {
      setEditingRow(null);
    }
  };

  const handleFieldChange = (value, key, record) => {
    const newData = records.map((item) => {
      if (item.registry === record.registry) {
        return { ...item, [key]: value };
      }
      return item;
    });
    setRecords(newData);
  };

  const columns = [
    {
      title: "",
      dataIndex: "checkbox",
      render: (_, record) => (
        <Checkbox
          checked={selectedRowKeys.includes(record.registry)}
          onChange={() => onSelectChange([record.registry])}
        />
      ),
    },
    { title: "Registry", dataIndex: "registry", key: "registry" },
    { title: "ID", dataIndex: "id", key: "id" },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (_, record) =>
        editingRow === record.registry ? (
          <Input
            value={record.date}
            onChange={(e) => handleFieldChange(e.target.value, "date", record)}
          />
        ) : (
          record.date
        ),
    },
    {
      title: "Diurnal",
      dataIndex: "diurnal",
      key: "diurnal",
      render: (_, record) =>
        editingRow === record.registry ? (
          <Input
            value={record.diurnal}
            onChange={(e) =>
              handleFieldChange(e.target.value, "diurnal", record)
            }
          />
        ) : (
          record.diurnal
        ),
    },
    {
      title: "Nocturnal",
      dataIndex: "nocturnal",
      key: "nocturnal",
      render: (_, record) =>
        editingRow === record.registry ? (
          <Input
            value={record.nocturnal}
            onChange={(e) =>
              handleFieldChange(e.target.value, "nocturnal", record)
            }
          />
        ) : (
          record.nocturnal
        ),
    },
    {
      title: "DiurnalHoliday",
      dataIndex: "diurnalHoliday",
      key: "diurnalHoliday",
      render: (_, record) =>
        editingRow === record.registry ? (
          <Input
            value={record.diurnalHoliday}
            onChange={(e) =>
              handleFieldChange(e.target.value, "diurnalHoliday", record)
            }
          />
        ) : (
          record.diurnalHoliday
        ),
    },
    {
      title: "NocturnalHoliday",
      dataIndex: "nocturnalHoliday",
      key: "nocturnalHoliday",
      render: (_, record) =>
        editingRow === record.registry ? (
          <Input
            value={record.nocturnalHoliday}
            onChange={(e) =>
              handleFieldChange(e.target.value, "nocturnalHoliday", record)
            }
          />
        ) : (
          record.nocturnalHoliday
        ),
    },
    {
      title: "ExtraHours",
      dataIndex: "extraHour",
      key: "extraHour",
      render: (_, record) =>
        editingRow === record.registry ? (
          <Input
            value={record.extraHours}
            onChange={(e) =>
              handleFieldChange(e.target.value, "extraHours", record)
            }
          />
        ) : (
          record.extraHours
        ),
    },
    {
      title: "Observations",
      dataIndex: "observations",
      key: "observations",
      render: (_, record) =>
        editingRow === record.registry ? (
          <Input
            value={record.observations}
            onChange={(e) =>
              handleFieldChange(e.target.value, "observations", record)
            }
          />
        ) : (
          record.observations
        ),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) =>
        editingRow === record.registry ? (
          <Button onClick={() => saveEdit(record)}>Save</Button>
        ) : (
          <Button onClick={() => startEdit(record)}>Edit</Button>
        ),
    },
  ];

  return (
    <div>
      <Search placeholder="Cédula" onSearch={onSearch} />
      <Table
        dataSource={records}
        columns={columns}
        rowKey="registry"
        scroll={{ x: 900 }}
        rowSelection={{ selectedRowKeys, onChange: onSelectChange }}
      />
    </div>
  );
};
