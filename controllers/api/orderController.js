const asyncHandler = require("../../utils/asyncHandler");
const AppError = require("../../utils/appError");

const Order = require("../../models/orderModel");
const Cart = require("../../models/cartModel");

exports.newOrder = asyncHandler(async (req, res, next) => {
  const { phoneNumber, shippingAddress } = req.body;

  if (!phoneNumber || !shippingAddress)
    return next(new AppError(400, "Please provide phone and address"));

  const order = { phoneNumber, shippingAddress };

  order.userId = req.user.id;

  const userCart = await Cart.findOne({ userId: req.user.id });

  if (!userCart) return next(new AppError(400, "Your cart is empty"));

  order.items = userCart.items;
  order.total = userCart.total;

  const newOrder = await Order.create(order);

  await Cart.findByIdAndDelete(userCart.id);

  res.status(201).json({ status: "success", data: { order: newOrder } });
});
