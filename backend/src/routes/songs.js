const express = require("express");
const {
    getAll,
    getOne,
    deleteOne,
    uploadOne,
    createSong,
} = require("../controllers/songs");
const upload = require("../configs/multer");

const router = express.Router();

router.get("/", getAll);
router.get("/:id", getOne);
router.post("/", createSong);
router.post("/upload", upload.single("audio"), uploadOne);
router.delete("/:id", deleteOne);

module.exports = router;
