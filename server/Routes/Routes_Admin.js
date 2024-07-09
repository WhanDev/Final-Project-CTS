const express = require("express");
const router = express.Router();

const {
  read,
  list,
  create,
  createAdmin,
  update,
  remove,
  dataDashboard,
  updatedById,
  changePassword,
} = require("../Controllers/Contr_Admin");
// middleware

//http://localhost:5000/api/admin
router.post("/admin", create);
router.get("/admin", list,createAdmin);
router.get("/admin/:_id", read);
router.put("/admin/:_id", update);
router.delete("/admin/:_id", remove);
router.post("/admin/updated/", updatedById);
router.post("/admin/changePassword/:_id", changePassword);
router.get("/admin/dashboard/data", dataDashboard);
module.exports = router;
