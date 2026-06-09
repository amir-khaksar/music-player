const express = require("express");
const {
    getAll,
    getOne,
    deleteOne,
    uploadOne,
    createSong,
    getLikedSongs,
    likeSong,
    unlikeSong,
} = require("../controllers/songs");
const upload = require("../configs/multer");
const { protect } = require("../middlewares/auth");

const router = express.Router();
router.get("/", getAll);

router.get("/likes", protect, getLikedSongs);

router.post("/:songId/like", protect, likeSong);

router.delete("/:songId/like", protect, unlikeSong);

router.get("/:id", getOne);

router.post("/", createSong);

router.post("/upload", upload.single("audio"), uploadOne);

router.delete("/:id", deleteOne);

module.exports = router;
