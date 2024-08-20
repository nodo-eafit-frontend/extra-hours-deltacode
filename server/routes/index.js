const express = require("express");
const {
  getExtrahours,
  putExtrahours,
  deleteExtrahours,
  postExtrahours,
} = require("../apis/extrahours");
const { getEmployee } = require("../apis/employee");
// const { getExportReport } = require("../apis/report");
const { getEmployeeWithExtraHours } = require("../apis/employeeWithExtraHours");

const router = express.Router();

router.get("/extra-hour", getExtrahours);

router.get("/employee-info/:id", getEmployee);
router.put("/extra-hour", putExtrahours);
router.delete("/extra-hour:registry", deleteExtrahours);
router.post("/extra-hour", postExtrahours);

router.get("/employeeWithExtraHours/:id", getEmployeeWithExtraHours);

module.exports = router;
