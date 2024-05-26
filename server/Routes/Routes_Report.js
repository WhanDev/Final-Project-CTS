const express = require("express");
const router = express.Router();
const {
  generatePdfPath1,
  generatePdfPath2,
  generatePdfPath3,
} = require("../Controllers/Contr_Report");

const {
  generatePdfPath1S,
} = require("../Controllers/Contr_ReportAraay1");

const {
  generatePdfPath2S
} = require("../Controllers/Contr_ReportAraay2");

//http://localhost:5000/api/reportPath
router.get("/reportPath1/:_id", generatePdfPath1);
router.post("/reportPath1S/", generatePdfPath1S);
router.get("/reportPath2/:_id", generatePdfPath2);
router.post("/reportPath2S/", generatePdfPath2S);
router.get("/reportPath3/", generatePdfPath3);

module.exports = router;
