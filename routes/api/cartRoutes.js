const express = require("express");

const cartController = require("../../controllers/api/cartController");
const authController = require("../../controllers/api/authController");

const router = express.Router();

router.use(authController.isAuthenticated);
router.route("/").get(cartController.getCart).post(cartController.addToCart);

module.exports = router;
