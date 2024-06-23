const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getCart,
  postProductDetails,
  postAddToCart,
} = require("../controllers/shop");

router.get("/", getAllProducts);
router.post("/add-to-cart", postAddToCart);
router.get("/cart", getCart);
router.get("/products/:id", postProductDetails);
module.exports = router;
