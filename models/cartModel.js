const mongoose = require("mongoose");

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

const cartSchema = new mongoose.Schema(
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
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

cartSchema.pre(/^find/, function (next) {
  this.populate({ path: "items.itemId", select: "image price name" });
  next();
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
