import React, { useState } from "react";
import { Input, Table } from "antd";
import { findEmployee } from "@services/findEmployee";
import { findExtraHour } from "@services/findExtraHour";
import ExcelJS from "exceljs";
import "./ReportInfo.scss";

export const ReportInfo = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (idOrRegistry) => {
    const numericIdOrRegistry = parseInt(idOrRegistry, 10);
    setLoading(true);
    setError(null);

    try {
      const employee = await findEmployee(numericIdOrRegistry);
      const extraHours = await findExtraHour(numericIdOrRegistry, "id");

      if (!extraHours.length) {
        const extraHourByRegistry = await findExtraHour(
          numericIdOrRegistry,
          "registry"
        );
        setEmployeeData(
          extraHourByRegistry.map((extraHour) => ({
            ...employee,
            ...extraHour,
          }))
        );
      } else {
        setEmployeeData(
          extraHours.map((extraHour) => ({ ...employee, ...extraHour }))
        );
      }
    } catch (error) {
      setError("No se encontraron datos para el ID ingresado.");
      setEmployeeData([]);
    } finally {
      setLoading(false);
    }
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
  ];

  const handleExport = async () => {
    try {
      const xlsBuffer = await generateXLS(employeeData);
      const blob = new Blob([xlsBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "data.xls";
      link.click();
    } catch (error) {
      console.error("Error generating XLS file:", error);
    }
  };

  const generateXLS = async (data) => {
    try {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Tasks Data", {
        pageSetup: { paperSize: 9, orientation: "landscape" },
      });

      worksheet.columns = [
        { header: "ID", key: "id", width: 15 },
        { header: "Empleado", key: "name", width: 30 },
        { header: "Salario", key: "salary", width: 15 },
        { header: "Cargo", key: "position", width: 30 },
        { header: "Supervisor", key: "supervisor", width: 30 },
        { header: "Fecha", key: "date", width: 15 },
        { header: "Diurnas", key: "diurnal", width: 10 },
        { header: "Nocturnas", key: "nocturnal", width: 10 },
        { header: "Diurnas Festivas", key: "diurnalHoliday", width: 15 },
        { header: "Nocturnas Festivas", key: "nocturnalHoliday", width: 15 },
        { header: "Total Horas Extras", key: "extrasHours", width: 20 },
        { header: "Observaciones", key: "observations", width: 30 },
        { header: "Registro", key: "registry", width: 15 },
      ];

      data.forEach((task) => {
        worksheet.addRow(task);
      });

      worksheet.getRow(1).font = { bold: true };

      return workbook.xlsx.writeBuffer();
    } catch (err) {
      console.log(err);
      throw new Error("Error generating XLS file");
    }
  };

  return (
    <div className="ReportInfo">
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
              x: 1200,
              y: 800,
            }}
          />
        </div>
      )}
      <button onClick={handleExport}>Exportar a Excel</button>
    </div>
  );
};
