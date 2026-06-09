const express = require("express");
const {
    createPlaylist,
    getMyPlaylists,
    addSongToPlaylist,
    deletePlaylist,
    removeSongFromPlaylist,
} = require("../controllers/playlists");

const router = express.Router();

router.use(protect);

router.get("/", getMyPlaylists);

router.post("/", createPlaylist);

router.post("/:playlistId/songs", addSongToPlaylist);

router.delete("/:playlistId", deletePlaylist);

router.delete("/:playlistId/songs/:songId", removeSongFromPlaylist);

module.exports = router;
