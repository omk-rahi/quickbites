const express = require("express");

const orderController = require("../../controllers/api/orderController");
const authController = require("../../controllers/api/authController");

const router = express.Router();

router.use(authController.isAuthenticated);
router.post("/", orderController.newOrder);

module.exports = router;
