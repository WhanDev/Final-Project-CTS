const express = require("express");
const router = express.Router();

const {
  read,
  list,
  create,
  update,
  remove,
  listByCurriculm,
  readBygroup
} = require("../Controllers/Contr_Structure");
// middleware

//http://localhost:5000/api/structure
router.post("/structure", create);
router.get("/structure", list);
router.get("/curriculum/structure/:curriculum", listByCurriculm);
router.get("/structure/:_id", read);
router.get("/structure/group/:group_id", readBygroup);
router.put("/structure/:_id", update);
router.delete("/structure/:_id", remove);

module.exports = router;
