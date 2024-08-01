require("dotenv").config();
const { readJsonFile } = require("../utils/json-reader");
//const employeeInfoJSON = require("../data/employee-info.json");

const getEmployee = async (request, response) => {
  const id = Number(request.params.id);
  try {
    let employeeInfoJSON = [];

    employeeInfoJSON = await readJsonFile(process.env.JSON_DIR_EMPLOYEE_INFO);

    const employyeFound = employeeInfoJSON.find((employee) => {
      return employee.id === id;
    });

    response.status(200).send(employyeFound);
  } catch (error) {
    response.status(400);
  }
};

module.exports = {
  getEmployee,
};
