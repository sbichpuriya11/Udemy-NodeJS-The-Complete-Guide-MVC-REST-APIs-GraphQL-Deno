const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getCart,
  postProductDetails,
  postAddToCart,
  postCreateOrder,
  getOrders,
} = require("../controllers/shop");

router.get("/", getAllProducts);
router.post("/add-to-cart", postAddToCart);
router.get("/cart", getCart);
router.get("/products/:id", postProductDetails);
router.post("/create-order", postCreateOrder);
router.get("/orders", getOrders);
module.exports = router;
