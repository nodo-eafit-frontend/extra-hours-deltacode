import React, { useState, useEffect } from "react";
import "./ExtraHoursTable.scss";
import reportExportService from "../../services/reportExport";
import ExcelJS from "exceljs";

const ExtraHoursTable = () => {
  const [fetchedTasks, setFetchedTasks] = useState([]);

  useEffect(() => {
    reportExportService
      .getExtraHoursData()
      .then((data) => setFetchedTasks(data))
      .catch((error) => console.error("Error fetching data"));
  }, []);

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

      let rowIndex = 1;
      let row = worksheet.getRow(rowIndex);
      row.values = [
        "registry",
        "ID",
        "Name",
        "Position",
        "diurnal",
        "nocturnal",
        "diurnalHoliday",
        "nocturnalHoliday",
        "ExtraHours",
        "Date",
        "Supervisor",
      ];
      row.font = { bold: true };

      const columnWidths = [20, 30, 30, 20, 20, 30, 20, 20, 20, 20, 30];

      row.eachCell((cell, colNumber) => {
        worksheet.getColumn(colNumber).width = columnWidths[colNumber - 1];
      });

      data.forEach((task, index) => {
        const row = worksheet.getRow(rowIndex + index + 1);
        row.getCell(1).value = task.registry;
        row.getCell(2).value = task.id;
        row.getCell(3).value = task.name;
        row.getCell(4).value = task.position;
        row.getCell(5).value = task.diurnal;
        row.getCell(6).value = task.nocturnal;
        row.getCell(7).value = task.diurnalHoliday;
        row.getCell(8).value = task.nocturnalHoliday;
        row.getCell(9).value = task.extraHours;
        row.getCell(10).value = task.date;
        row.getCell(11).value = task.supervisor;

        row.getCell(3).alignment = { wrapText: true };
        row.getCell(11).alignment = { wrapText: true };
      });

      worksheet.getRow(1).height = 40;

      const borderStyle = {
        style: "thin",
        color: { argb: "00000000" },
      };

      worksheet.eachRow((row) => {
        row.eachCell({ includeEmpty: true }, (cell) => {
          cell.border = {
            top: borderStyle,
            bottom: borderStyle,
            left: borderStyle,
            right: borderStyle,
          };
        });
      });

      return workbook.xlsx.writeBuffer();
    } catch (err) {
      console.log(err);
      throw new Error("Error generating XLS file");
    }
  };

  return (
    <>
      <button onClick={handleExport}>Exportar a Excel</button>
      <table>
        <thead>
          <tr>
            <th>Registry</th>
            <th>ID</th>
            <th>Name</th>
            <th>Position</th>
            <th>Diurnal</th>
            <th>Nocturnal</th>
            <th>DiurnalHoliday</th>
            <th>NocturnalHoliday</th>
            <th>ExtraHours</th>
            <th>Date</th>
            <th>Supervisor</th>
          </tr>
        </thead>
        <tbody>
          {fetchedTasks.map((task, index) => (
            <tr key={index}>
              <td>{task.registry}</td>
              <td>{task.id}</td>
              <td>{task.name}</td>
              <td>{task.position}</td>
              <td>{task.diurnal}</td>
              <td>{task.nocturnal}</td>
              <td>{task.diurnalHoliday}</td>
              <td>{task.nocturnalHoliday}</td>
              <td>{task.extraHours}</td>
              <td>{task.date}</td>
              <td>{task.supervisor}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ExtraHoursTable;
