require("dotenv").config();
const { readJsonFile } = require("../utils/json-reader");
const employeeInfoJSON = require("../data/employee-info.json");

const getEmployee = async (request, response) => {
  try {
    const employeeInfoJSON = await readJsonFile(
      process.env.JSON_DIR_EMPLOYEE_INFO
    );
    response.status(200).send(employeeInfoJSON);
  } catch (error) {
    response.status(400);
  }
};

module.exports = {
  getEmployee,
};
