const mongoose = require("mongoose");

const menuSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Menu name is required"],
  },

  description: {
    type: String,
    trim: true,
    required: [true, "Menu description is required"],
  },

  price: {
    type: Number,
    min: [10, "Menu price must be above 10"],
    required: [true, "Menu price is required"],
  },

  image: {
    type: String,
    required: [true, "Menu image is required"],
  },
});

const Menu = mongoose.model("Menu", menuSchema);

module.exports = Menu;
