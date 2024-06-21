const express = require("express");
const router = express.Router();
const path = require("path");
const { Product } = require("../models/Product");
const {
  getAddProducts,
  getPostProduct,
  postEditProduct,
  postDeleteProduct,
  postProductDetails,
  updateProduct,
} = require("../controllers/products");
const products = [];

router.get("/add-product", getAddProducts);

router.post("/add-product", getPostProduct);

router.get("/edit-product/:id", postEditProduct);

router.get("/delete-product/:id", postDeleteProduct);

router.get("/:id", postProductDetails);

router.post("/edit-product", updateProduct);

exports.products = products;
exports.router = router;
