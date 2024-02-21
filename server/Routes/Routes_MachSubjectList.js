const express = require("express");
const router = express.Router();

const {
  create,
  list,
  read,
  update,
  remove,
} = require("../Controllers/Contr_MachSubjectList");

//http://localhost:5000/api/machsubjectlist
router.post("/machsubjectlist", create);
router.get("/machsubjectlist", list);
router.get("/machsubjectlist/:_id", read);
router.put("/machsubjectlist/:_id", update);
router.delete("/machsubjectlist/:_id", remove);

module.exports = router;