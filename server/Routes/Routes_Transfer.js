const express = require("express");
const router = express.Router();

const { TestTransfer, Transfer } = require("../Controllers/Contr_Transfer");

//http://localhost:5000/api/transfer
router.post("/transfer/test", TestTransfer);
router.post("/transfer", Transfer);

module.exports = router;
