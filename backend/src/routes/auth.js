const express = require("express");
const { login, callback, search } = require("../controllers/auth");

const router = express.Router();

router.get("/login", login);
router.get("/callback", callback);
router.get("/search", search);

module.exports = router;
