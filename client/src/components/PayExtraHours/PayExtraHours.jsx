import React, { useState } from "react";
import { Input, Table, Button, message } from "antd";
import { findEmployeeWithExtraHours } from "@services/findEmployeeWithExtraHours";
import "./PayExtraHours.scss";

export const PayExtraHours = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleSearch = async (idOrRegistry) => {
    const numericIdOrRegistry = parseInt(idOrRegistry, 10);
    setLoading(true);
    setError(null);

    try {
      const extraHours = await findEmployeeWithExtraHours(
        numericIdOrRegistry,
        "id"
      );

      setEmployeeData(extraHours);
    } catch (error) {
      setError("No se encontraron datos para el ID ingresado.");
      setEmployeeData([]);
    } finally {
      setLoading(false);
    }
  };

  const handlePay = (record) => {
    setSelectedRow(record.registry);

    const salary = parseFloat(record.salary) || 0; // Asegúrate de que el salario es un número
    const hourlyRate = salary / 240;

    console.log("Salary:", salary, "Hourly Rate:", hourlyRate);

    const diurnal = parseFloat(record.diurnal) || 0;
    const nocturnal = parseFloat(record.nocturnal) || 0;
    const diurnalHoliday = parseFloat(record.diurnalHoliday) || 0;
    const nocturnalHoliday = parseFloat(record.nocturnalHoliday) || 0;

    const totalHours =
      hourlyRate * (diurnal * 1.25) +
      hourlyRate * nocturnal * 1.75 +
      hourlyRate * diurnalHoliday * 2 +
      hourlyRate * nocturnalHoliday * 2.5;

    console.log("Total Hours:", totalHours);

    const payment = totalHours;
    console.log("Payment:", payment);

    message.info(
      `El pago calculado para este registro es: $${payment.toFixed(2)}`
    );
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Empleado",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Salario",
      dataIndex: "salary",
      key: "salary",
    },
    {
      title: "Cargo",
      dataIndex: "position",
      key: "position",
    },
    {
      title: "Supervisor",
      dataIndex: "supervisor",
      key: "supervisor",
    },
    {
      title: "Fecha",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Diurnas",
      dataIndex: "diurnal",
      key: "diurnal",
    },
    {
      title: "Nocturnas",
      dataIndex: "nocturnal",
      key: "nocturnal",
    },
    {
      title: "Diurnas Festivas",
      dataIndex: "diurnalHoliday",
      key: "diurnalHoliday",
    },
    {
      title: "Nocturnas Festivas",
      dataIndex: "nocturnalHoliday",
      key: "nocturnalHoliday",
    },
    {
      title: "Total Horas Extras",
      dataIndex: "extrasHours",
      key: "extrasHours",
    },
    {
      title: "Observaciones",
      dataIndex: "observations",
      key: "observations",
    },
    {
      title: "Registro",
      dataIndex: "registry",
      key: "registry",
    },
    {
      title: "Acciones",
      key: "actions",
      render: (text, record) => (
        <span>
          <Button
            type="link"
            onClick={() => handlePay(record)}
            style={{ marginRight: 8 }}
          >
            Pagar
          </Button>
        </span>
      ),
    },
  ];

  const rowClassName = (record) => {
    return selectedRow === record.registry ? "selected-row" : "";
  };

  return (
    <div className="PayExtraHours">
      <div className="search-container">
        <Input.Search
          placeholder="Ingrese ID del empleado"
          onSearch={handleSearch}
        />
        {error && <p className="error-message">{error}</p>}
      </div>

      {loading && <p>Cargando datos...</p>}

      {employeeData.length > 0 && (
        <div className="extra-hours-info">
          <h3>Registros de Horas Extras</h3>
          <Table
            columns={columns}
            dataSource={employeeData}
            rowKey="registry"
            pagination={false}
            scroll={{
              x: 900,
              y: 500,
            }}
            rowClassName={rowClassName}
          />
        </div>
      )}
    </div>
  );
};
