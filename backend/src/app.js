const express = require("express");
const cors = require("cors");

const songsRouter = require("./routes/songs");
const playlistsRouter = require("./routes/playlists");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/songs", songsRouter);
app.use("/api/playlists", playlistsRouter);

module.exports = app;
