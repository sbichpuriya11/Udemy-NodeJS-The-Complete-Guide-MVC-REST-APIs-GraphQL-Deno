const express = require("express");
const router = express.Router();
const path = require("path");

const products = [];

router.get("/admin/add-product", (req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "views", "add-product.html"));
});

router.post("/admin/add-product", (req, res, next) => {
  const { productName, productPrice, productDescription } = req.body;
  products.push({ productName, productPrice, productDescription });
  res.redirect("/");
});

exports.router = router;
exports.products = products;
