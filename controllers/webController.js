const Menu = require("../models/menuModel");

const Order = require("../models/orderModel");

exports.index = async (req, res) => {
  const menus = await Menu.find().sort("-price").limit(3);

  res.render("index", { menus });
};

exports.menu = async (req, res) => {
  const menus = await Menu.find().sort("price");
  res.render("menu", { menus });
};

exports.login = (req, res) => {
  res.render("login");
};

exports.register = (req, res) => {
  res.render("register");
};

exports.cart = (req, res) => {
  res.render("cart");
};

exports.orders = async (req, res) => {
  const orders = await Order.find({ userId: req.user.id }).populate({
    path: "items.itemId",
    select: "name",
  });

  res.render("orders", { orders });
};
