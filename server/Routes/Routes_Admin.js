const express = require("express");
const router = express.Router();

const {
  read,
  list,
  create,
  update,
  remove,
} = require("../Controllers/Contr_Admin");
// middleware

//http://localhost:5000/api/admin
router.post("/admin", create);
router.get("/admin", list);
router.get("/admin/:_id", read);
router.put("/admin/:_id", update);
router.delete("/admin/:_id", remove);

module.exports = router;