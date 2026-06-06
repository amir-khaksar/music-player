const express = require("express");
const cors = require("cors");

const songsRouter = require("./routes/songs");
const authRouter = require("./routes/auth");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/songs", songsRouter);
app.use("/api/auth", authRouter);

module.exports = app;
