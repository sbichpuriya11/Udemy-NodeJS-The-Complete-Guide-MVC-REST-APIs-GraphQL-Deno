const express = require("express");
const {
  getAddProductPage,
  postAddProduct,
  getAllAdminProducts,
  postUpdateProductRegistrationPage,
  postUpdateProduct,
  getDeleteProduct,
} = require("../controller/admin");

const router = express.Router();

router.get("/getProducts", getAllAdminProducts);
router.get("/add-products", getAddProductPage);
router.post("/add-products", postAddProduct);
router.get("/update-product/:id", postUpdateProductRegistrationPage);
router.post("/update-product", postUpdateProduct);
router.get("/delete-product/:id", getDeleteProduct);
module.exports = router;
