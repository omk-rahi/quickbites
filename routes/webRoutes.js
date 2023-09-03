const express = require("express");

const webController = require("../controllers/webController");

const { isLoggedIn } = require("../controllers/api/authController");

const router = express.Router();

router.use(isLoggedIn);

router.get("/", webController.index);

router.get("/menu", webController.menu);

router.get("/login", webController.login);

router.get("/register", webController.register);

router.get("/cart", webController.cart);

router.get("/orders", webController.orders);

module.exports = router;
