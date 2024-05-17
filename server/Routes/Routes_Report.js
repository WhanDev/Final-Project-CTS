const express = require("express");
const router = express.Router();
const { generatePdfPath1 } = require("../Controllers/Contr_Report");

//http://localhost:5000/api/reportPath
router.get("/reportPath1", generatePdfPath1);

module.exports = router;