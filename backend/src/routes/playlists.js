const express = require("express");
const {
    createPlaylist,
    getMyPlaylists,
    addSongToPlaylist,
    deletePlaylist,
    removeSongFromPlaylist,
    getSongsWithPlaylists,
} = require("../controllers/playlists");
const { protect } = require("../middlewares/auth");

const router = express.Router();

router.use(protect);

router.get("/", getMyPlaylists);

router.get("/:playlistId/songs", getSongsWithPlaylists);

router.post("/", createPlaylist);

router.post("/:playlistId/songs", addSongToPlaylist);

router.delete("/:playlistId", deletePlaylist);

router.delete("/:playlistId/songs/:songId", removeSongFromPlaylist);

module.exports = router;
