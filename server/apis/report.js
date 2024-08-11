const ExcelJS = require("exceljs");

const getExportReport = async (request, response) => {
  try {
    let tasks = [
      {
        id: 123456,
        name: "Ana María García López",
        position: "Analista nivel 2",
        extraHours: 3,
        date: "2-07-2024",
        supervisor: "Carlos Miguel Pérez Sánchez",
      },
      {
        id: 123457,
        name: "Luis Alberto Rodríguez Fernández",
        position: "Analista nivel 3",
        extraHours: 2,
        date: "2-07-2024",
        supervisor: "Carlos Miguel Pérez Sánchez",
      },
    ];
    if (tasks.length > 0) {
      const xlsBuffer = await generateXLS(tasks);
      response.set("Content-Disposition", "attachment; filename=data.xls");
      response.type(
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      response.send(xlsBuffer);
    }
  } catch (err) {
    response.json({ message: "Something went wrong", error: err.message });
  }
};

async function generateXLS(data) {
  try {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Tasks Data", {
      pageSetup: { paperSize: 9, orientation: "landscape" },
    });

    // Initialize the row index
    let rowIndex = 1;

    let row = worksheet.getRow(rowIndex);
    row.values = ["ID", "Name", "Position", "ExtraHours", "Date", "Supervisor"];
    row.font = { bold: true };

    const columnWidths = [20, 30, 30, 20, 20, 30];

    row.eachCell((cell, colNumber) => {
      worksheet.getColumn(colNumber).width = columnWidths[colNumber - 1];
    });

    // Loop over the grouped data
    data.forEach((task, index) => {
      const row = worksheet.getRow(rowIndex + index + 1);
      row.getCell(1).value = task.id;
      row.getCell(2).value = task.name;
      row.getCell(3).value = task.position;
      row.getCell(4).value = task.extraHours;
      row.getCell(5).value = new Date(task.date);
      row.getCell(6).value = task.supervisor;

      row.getCell(2).alignment = { wrapText: true };
      row.getCell(6).alignment = { wrapText: true };
    });

    worksheet.getRow(1).height = 40;

    // Define the border style
    const borderStyle = {
      style: "thin", // You can use 'thin', 'medium', 'thick', or other valid styles
      color: { argb: "00000000" },
    };

    // Loop through all cells and apply the border style
    worksheet.eachRow((row, rowNumber) => {
      row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
        cell.border = {
          top: borderStyle,
          bottom: borderStyle,
          left: borderStyle,
          right: borderStyle,
        };
      });
    });

    // Generate the XLS file
    return workbook.xlsx.writeBuffer();
  } catch (err) {
    console.log(err);
    throw new Error("Error generating XLS file");
  }
}

module.exports = {
  getExportReport,
  generateXLS,
};
