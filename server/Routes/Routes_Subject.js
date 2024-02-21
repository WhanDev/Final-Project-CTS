const express = require("express");
const router = express.Router();

const {
  read,
  readSubject_id,
  list,
  create,
  update,
  remove,
  listByStructure,
} = require("../Controllers/Contr_Subject");

//http://localhost:5000/api/subject
router.post("/subject", create);
router.get("/subject", list);
router.get("/structure/subject/:structure_id", listByStructure);
//http://localhost:5000/api/structure/subject/:structure_id
router.get("/subject/:_id", read);
router.get("/subject/subject_id/:subject_id", readSubject_id);
router.put("/subject/:_id", update);
router.delete("/subject/:_id", remove);

module.exports = router;