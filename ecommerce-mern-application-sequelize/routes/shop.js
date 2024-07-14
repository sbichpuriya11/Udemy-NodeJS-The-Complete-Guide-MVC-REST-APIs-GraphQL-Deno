const express = require("express");
const {
  getShopHomePage,
  postProductDetail,
  getCartDetails,
  postAddToCart,
  postDeleteProductFromCart,
  getProductsPage,
  showAllOrders,
  createOrder,
} = require("../controller/shop");
const router = express.Router();

router.get("/", getShopHomePage);
router.get("/products", getProductsPage);
router.post("/product-detail", postProductDetail);
router.post("/add-to-cart", postAddToCart);
router.get("/cart", getCartDetails);
router.post("/delete", postDeleteProductFromCart);
router.get("/orders", showAllOrders);
router.post("/create-order",createOrder);
module.exports = router;
