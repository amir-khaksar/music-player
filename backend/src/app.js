const express = require("express");
const cors = require("cors");

const songsRouter = require("./routes/songs");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/songs", songsRouter);

module.exports = app;
