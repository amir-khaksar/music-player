const express = require("express");
const { getAll } = require("./../controller/songs");

const router = express.Router();

router.get("/", getAll);

module.exports = router;
