const express = require("express");
const {
  getExtrahours,
  putExtrahours,
  deleteExtrahours,
  postExtrahours,
} = require("../apis/extrahours");
const { getEmployee } = require("../apis/employee");
const { getExportReport } = require("../apis/report");

const router = express.Router();

router.get("/extra-hour", getExtrahours);

router.get("/employee-info", getEmployee);
router.put("/extra-hour", putExtrahours);
router.delete("/extra-hour", deleteExtrahours);
router.post("/extra-hour", postExtrahours);

router.get("/report-info", getExportReport);

module.exports = router;
