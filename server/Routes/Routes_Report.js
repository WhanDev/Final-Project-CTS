const express = require("express");
const router = express.Router();
const {
  generatePdfPath1,
  generatePdfPath2,
} = require("../Controllers/Contr_Report");

//http://localhost:5000/api/reportPath
router.get("/reportPath1/:_id", generatePdfPath1);
router.get("/reportPath2/:_id", generatePdfPath2);

module.exports = router;
