const express = require("express");
const {
  getShopHomePage,
  postProductDetail,
  getCartData,
  postAddProductToCart,
  postDeleteProductFromCart,
  getProductPage,
  getOrdersDetails,
  postCreateOrder,
} = require("../controller/shop");
const router = express.Router();

router.get("/", getShopHomePage);
router.get("/products", getProductPage);
router.post("/product-detail", postProductDetail);
router.post("/add-to-cart", postAddProductToCart);
router.get("/cart", getCartData);
router.post("/delete", postDeleteProductFromCart);
router.post("/create-order", postCreateOrder);
router.get("/orders", getOrdersDetails);
module.exports = router;
