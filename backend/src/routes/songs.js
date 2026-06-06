const express = require("express");
const { getAll, getOne } = require("./../controller/songs");

const router = express.Router();

router.get("/", getAll);
router.get("/:id", getOne);

module.exports = router;
