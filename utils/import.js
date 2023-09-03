const fs = require("node:fs");
const path = require("node:path");

const mongoose = require("mongoose");

const Menu = require("../models/menuModel");

const data = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, "../", "src", "data", "data.json"),
    "utf-8"
  )
);

mongoose
  .connect("mongodb://127.0.0.1:27017/quick-bites")
  .then(() => console.log("CONNECTED"));

Menu.create(data).then(() => console.log("DATA ADDED"));
