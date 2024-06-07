const express = require("express");
const router = express.Router();

const shopController = require("../controllers/shop");

// / => GET
router.get("/", shopController.getIndex);

// /products => GET
router.get("/products", shopController.displayProducts);

// /cart => GET
router.get("/cart", shopController.getCart);

// /checkout => GET
router.get("/checkout", shopController.getCheckout);

module.exports = router;
