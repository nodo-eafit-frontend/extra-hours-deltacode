const { readJsonFile } = require("../utils/json-reader");
require("dotenv").config();

const getEmployeeWithExtraHours = async (request, response) => {
  const employeeId = Number(request.params.id);

  try {
    const employeeInfo = await readJsonFile(process.env.JSON_DIR_EMPLOYEE_INFO);
    const extraHours = await readJsonFile(process.env.JSON_DIR_EXTRAHOUR);

    const employee = employeeInfo.find((emp) => emp.id === employeeId);

    if (!employee) {
      return response.status(404).json({ message: "Employee not found" });
    }

    const employeeExtraHours = extraHours.filter(
      (extraHour) => extraHour.id === employeeId
    );

    const result = employeeExtraHours.map((extraHour) => ({
      ...extraHour,
      name: employee.name,
      position: employee.position,
      salary: employee.salary,
      supervisor: employee.supervisor,
    }));

    response.json(result);
  } catch (error) {
    response
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  getEmployeeWithExtraHours,
};
