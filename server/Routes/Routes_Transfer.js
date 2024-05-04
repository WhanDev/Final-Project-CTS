const express = require("express");
const router = express.Router();

const { TestTransfer, Transfer,TransferListAdmin,TransferRead } = require("../Controllers/Contr_Transfer");

//http://localhost:5000/api/transfer
router.post("/transfer/test", TestTransfer);
router.post("/transfer", Transfer);
router.get("/transfer", TransferListAdmin);
router.get("/transfer/:_id", TransferRead);

module.exports = router;
