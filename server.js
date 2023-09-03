require("dotenv").config();

const mongoose = require("mongoose");

const app = require("./app.js");

const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Database connected"));

app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
