import React, { useState } from "react";
import { Input, Table } from "antd";
import { findEmployeeWithExtraHours } from "@services/findEmployeeWithExtraHours";
import "./EmployeeInfoWithExtraHoursTable.scss";
import ExcelJS from "exceljs";

const { Search } = Input;

export const EmployeeInfoWithExtraHours = () => {
  const [records, setRecords] = useState([]);
  const [fetchedTasks, setFetchedTasks] = useState([]);

  const onSearch = async (employeeId) => {
    try {
      const numericEmployeeId = parseInt(employeeId, 10);
      const data = await findEmployeeWithExtraHours(numericEmployeeId);
      setRecords(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setRecords([]);
    }
  };

  const columns = [
    { title: "Registry", dataIndex: "registry", key: "registry" },
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Position", dataIndex: "position", key: "position" },
    { title: "Salary", dataIndex: "salary", key: "salary" },
    { title: "Supervisor", dataIndex: "supervisor", key: "supervisor" },
    { title: "Diurnal", dataIndex: "diurnal", key: "diurnal" },
    { title: "Nocturnal", dataIndex: "nocturnal", key: "nocturnal" },
    {
      title: "DiurnalHoliday",
      dataIndex: "diurnalHoliday",
      key: "diurnalHoliday",
    },
    {
      title: "NocturnalHoliday",
      dataIndex: "nocturnalHoliday",
      key: "nocturnalHoliday",
    },
    { title: "ExtraHours", dataIndex: "extraHour", key: "extraHour" },
    { title: "Date", dataIndex: "date", key: "date" },
  ];

  const handleExport = async () => {
    try {
      const xlsBuffer = await generateXLS(fetchedTasks);
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
        { header: "Registry", key: "registry", width: 15 },
        { header: "ID", key: "id", width: 15 },
        { header: "Name", key: "name", width: 30 },
        { header: "Position", key: "position", width: 30 },
        { header: "Diurnal", key: "diurnal", width: 10 },
        { header: "Nocturnal", key: "nocturnal", width: 10 },
        { header: "DiurnalHoliday", key: "diurnalHoliday", width: 10 },
        { header: "NocturnalHoliday", key: "nocturnalHoliday", width: 10 },
        { header: "ExtraHours", key: "extraHours", width: 10 },
        { header: "Date", key: "date", width: 15 },
        { header: "Supervisor", key: "supervisor", width: 30 },
      ];

      data.forEach((task) => {
        worksheet.addRow(task);
      });

      worksheet.getRow(1).height = 40;

      const borderStyle = {
        style: "thin",
        color: { argb: "00000000" },
      };

      return workbook.xlsx.writeBuffer();
    } catch (err) {
      console.log(err);
      throw new Error("Error generating XLS file");
    }
  };

  return (
    <div>
      <Search placeholder="Cédula" onSearch={onSearch} />
      <Table
        dataSource={records}
        columns={columns}
        rowKey="registry"
        scroll={{ x: 900 }}
      />
      <button onClick={handleExport}>Exportar a Excel</button>
    </div>
  );
};
