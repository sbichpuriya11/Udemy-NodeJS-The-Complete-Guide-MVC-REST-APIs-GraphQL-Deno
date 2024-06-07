const express = require("express");
const router = express.Router();

const shopController = require("../controllers/shop");

// / => GET
router.get("/", shopController.getIndex);

// /products => GET
router.get("/products", shopController.displayProducts);

router.get("/products/:productId", shopController.displayProduct);
// /cart => GET
router.get("/cart", shopController.getCart);
router.post("/cart", shopController.postCart);
router.post("/cart-delete-item", shopController.postCartDeleteItem);
// /orders => GET
router.get("/orders", shopController.getOrders);

// /checkout => GET
router.get("/checkout", shopController.getCheckout);

module.exports = router;
