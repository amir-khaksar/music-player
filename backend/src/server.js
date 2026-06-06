require("dotenv").config();

const express = require("express");
const cors = require("cors");

const songsRouter = require("./routes/songs");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/songs", songsRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server running on ${process.env.PORT}`);
});
