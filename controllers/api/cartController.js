const Cart = require("../../models/cartModel");
const Menu = require("../../models/menuModel");

const asyncHandler = require("../../utils/asyncHandler");
const AppError = require("../../utils/appError");

exports.addToCart = asyncHandler(async (req, res, next) => {
  const { itemId } = req.body;

  const userId = req.user.id;

  if (!itemId) {
    return next(new AppError(400, "Please provide item id"));
  }

  const userCart = await Cart.findOne({ userId });
  const item = await Menu.findById(itemId);

  if (!item) {
    return next(new AppError(400, "Invalid item! Unable to add to cart"));
  }

  if (!userCart) {
    const cart = {
      userId,
      items: [{ itemId, quantity: 1, subTotal: item.price }],
      total: item.price,
    };

    const newCart = await Cart.create(cart);
    return res.json({ status: "success", data: { cart: newCart } });
  }

  userCart.items.forEach((cartItem) => {
    if (String(cartItem.itemId) === String(item._id)) {
      cartItem.quantity++;
      cartItem.subTotal += item.price;
      userCart.total += item.price;
    }
  });

  const itemIds = userCart.items.map((cartItem) => String(cartItem.itemId));

  if (!itemIds.includes(String(item._id))) {
    userCart.items.push({ itemId, quantity: 1, subTotal: item.price });
    userCart.total += item.price;
  }

  const updatedUserCart = await userCart.save();

  res.json({ status: "success", data: { cart: updatedUserCart } });
});

exports.getCart = asyncHandler(async (req, res, next) => {
  const cart = await Cart.findOne({ userId: req.user.id });

  res.json({ status: "success", data: { cart } });
});
