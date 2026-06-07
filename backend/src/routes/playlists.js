const express = require("express");
const { createPlaylist, getMyPlaylists } = require("../controllers/playlists");

const router = express.Router();

router.get("/playlists", getMyPlaylists);
router.post("/playlists", createPlaylist);
router.post("/playlists/:playlistId/songs", addSongToPlaylist);
router.delete("/playlists/:playlistId", deletePlaylist);
router.delete("/playlists/:playlistId/songs/:songId", removeSongFromPlaylist);

module.exports = router;
