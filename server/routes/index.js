const express = require("express");
const {
  getExtrahours,
  getExtrahoursById,
  putExtrahours,
  deleteExtrahours,
  postExtrahours,
} = require("../apis/extrahours");

const { getEmployee } = require("../apis/employee");
// const { getExtrahours } = require("../apis/extrahours");
// const { getExportReport } = require("../apis/report");
const { getEmployeeWithExtraHours } = require("../apis/employeeWithExtraHours");

const router = express.Router();

router.get("/extra-hour/registry/:registry", getExtrahours);
router.get("/extra-hour/id/:id", getExtrahoursById);

// router.get("/extra-hour/registry/:registry", getExtrahoursByRegistry);
// router.get("/extra-hour/id/:id", getExtrahoursById);

router.get("/employee-info/:id", getEmployee);
router.put("/extra-hour/:registry", putExtrahours);
router.delete("/extra-hour/:registry", deleteExtrahours);
router.post("/extra-hour", postExtrahours);

router.get(
  "/employeeWithExtraHours/:employeeId/extra-hour",
  getEmployeeWithExtraHours
);

module.exports = router;
