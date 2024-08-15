import React, { useState } from "react";
import { Table, Input, Button, Space } from "antd";

const { TextArea } = Input;

export const TableExtraHours = () => {
  // Estado para almacenar el registro seleccionado
  const [selectedRecord, setSelectedRecord] = useState(null);

  // Datos tabla
  const dataSource = [
    {
      registry: "",
      id: "",
      employee: "",
      position: "",
      date: "",
      diurnal: "",
      nocturnal: "",
      diurnalHollyday: "",
      nocturnalHollyday: "",
      extrasHours: "",
      observations: "",
    },
  ];

  // Definición de las columnas de la tabla
  const columns = [
    { title: "Registry", dataIndex: "registry", key: "registry" },
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Employee", dataIndex: "employee", key: "employee" },
    { title: "Position", dataIndex: "position", key: "position" },
    { title: "Date", dataIndex: "date", key: "date" },
    { title: "Diurna", dataIndex: "diurnal", key: "diurnal" },
    { title: "Nocturna", dataIndex: "nocturnal", key: "nocturnal" },
    {
      title: "DiurnaFestiva",
      dataIndex: "dirunalHollyday",
      key: "dirunalHollyday",
    },
    {
      title: "NocturnaFestiva",
      dataIndex: "nocturnalHollyday",
      key: "nocturnalHollyday",
    },
    { title: "Horas Extra", dataIndex: "horasExtra", key: "horasExtra" },
    { title: "Supervisor", dataIndex: "supervisor", key: "supervisor" },
  ];

  // Manejar la selección de un registro
  const onSelectRecord = (record) => {
    setSelectedRecord(record);
  };

  // Manejar cambios en los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedRecord({
      ...selectedRecord,
      [name]: value,
    });
  };

  // Renderizado del componente
  return (
    <div>
      <h2>Actualizar hora extra</h2>
      <Space direction="vertical" size="middle" style={{ display: "flex" }}>
        <Input.Search placeholder="ID Empleado" style={{ width: 200 }} />
        <Table
          dataSource={dataSource}
          columns={columns}
          rowSelection={{
            type: "radio",
            onSelect: onSelectRecord,
          }}
        />
        {selectedRecord && (
          <>
            <Space size="middle">
              <Input
                name="diurnal"
                value={selectedRecord.diurnal || ""}
                placeholder="Diurna"
                style={{ width: 120 }}
                onChange={handleInputChange}
              />
              <Input
                name="nocturnal"
                value={selectedRecord.nocturnalHollyday || ""}
                placeholder="Nocturna Festiva"
                style={{ width: 120 }}
                onChange={handleInputChange}
              />
              <Input
                name="diurnalHollyday"
                value={selectedRecord.diurnalHollyday || ""}
                placeholder="Diurna Festiva"
                style={{ width: 120 }}
                onChange={handleInputChange}
              />
              <Input
                name="nocturnalHollyday"
                value={selectedRecord.nocturnalHollyday || ""}
                placeholder="Nocturna Festiva"
                style={{ width: 120 }}
                onChange={handleInputChange}
              />
              <Input
                type="number"
                name="extrasHours"
                value={selectedRecord.extrasHours}
                placeholder="Horas extra"
                style={{ width: 120 }}
                onChange={handleInputChange}
              />
            </Space>
            <TextArea
              rows={4}
              name="observations"
              placeholder="Observaciones"
              value={selectedRecord.observations || ""}
              style={{ marginTop: 10 }}
              onChange={handleInputChange}
            />
            <Button type="primary" style={{ marginTop: 20 }}>
              Actualizar
            </Button>
          </>
        )}
      </Space>
    </div>
  );
};

export default UpdateOvertime;
