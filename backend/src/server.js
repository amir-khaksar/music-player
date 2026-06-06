const { default: mongoose } = require("mongoose");
const app = require("./app");

require("dotenv").config();

const port = process.env.PORT || 3000;

(async () => {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MOngoDB Connected");
})();

app.listen(prompt, () => {
    console.log(`Server Running on port 3000`);
});
