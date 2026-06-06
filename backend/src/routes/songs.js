const express = require("express");
const { getAll, getOne, deleteOne } = require("./../controller/songs");

const router = express.Router();

router.get("/", getAll);
router.get("/:id", getOne);
router.delete("/:id", deleteOne);

module.exports = router;
