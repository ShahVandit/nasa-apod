const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const users = require("./routes/user");
const db = require("./config/key").MongoURI;
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((user) => {
    console.log("Mongoose connected");
  })
  .catch((err) => console.log(err));

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/", users);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
const PORT = process.env.development || 3000;

app.listen(PORT, (req, res) => {
  console.log(`listening at port no ${PORT}`);
});
