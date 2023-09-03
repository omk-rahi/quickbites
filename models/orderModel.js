const mongoose = require("mongoose");

const validator = require("validator");

const itemSchema = new mongoose.Schema({
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Menu",
  },
  quantity: {
    type: Number,
    required: [true, "Quantity is required"],
    min: [1, "Quantity can not be less than 1"],
  },
  subTotal: {
    type: Number,
    default: 0,
  },
});

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    items: [itemSchema],
    total: {
      type: Number,
      default: 0,
    },

    shippingAddress: {
      type: String,
      required: [true, "Please provide a shipping address"],
      trim: true,
    },

    phoneNumber: {
      type: String,
      required: [true, "Please provide a phone number"],
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
