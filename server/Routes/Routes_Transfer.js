const express = require("express");
const router = express.Router();

const { TestTransfer } = require("../Controllers/Contr_Transfer");

//http://localhost:5000/api/transfer
router.post("/transfer/test", TestTransfer);

module.exports = router;
