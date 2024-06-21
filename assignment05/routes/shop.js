const express = require("express");
const router = express.Router();
const path = require("path");
const { products } = require("./products");
const { Product } = require("../models/Product");
const {
  getAllProducts,
  getCart,
  getAdminProducts,
} = require("../controllers/shop");
const { postAddToCart } = require("../controllers/shop");
router.get("/", getAllProducts);
router.post("/add-to-cart", postAddToCart);
router.get("/cart", getCart);
router.get("/admin", getAdminProducts);
module.exports = router;
