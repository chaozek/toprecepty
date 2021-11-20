const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const app = express();
const recipeRoute = require("./routes/recipeRoute");
const userRoute = require("./routes/userRoute");
const axios = require("axios");
var bodyParser = require("body-parser");

const axiosApiInstance = axios.create();
dotenv.config();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

mongoose
  .connect(process.env.MONGODB_URI || process.env.MONGO_URL)
  .then(() => console.log("DB CONNECTED"))
  .catch((err) => console.log(err));

app.use("/api/recipes", recipeRoute);
app.use("/api/users", userRoute);

app.use(express.static(path.join(__dirname, "./client/build")));

if (process.env.NODE_ENV == "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Api runnign");
  });
}
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("RUNNING" + PORT));

module.exports = app;
