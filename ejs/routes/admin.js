const express = require("express");
const router = express.Router();
const path = require("path");

const products = [];

router.get("/admin/add-product", (req, res, next) => {
  // res.sendFile(path.join(__dirname, "..", "views", "add-product.html"));
  res.render("add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
  });
});

router.post("/admin/add-product", (req, res, next) => {
  const { productName, productPrice, productDescription, productImage } =
    req.body;
  products.push({
    productName: productName,
    productPrice: productPrice,
    productDescription: productDescription,
    productImage: productImage,
  });
  res.redirect("/");
});

exports.router = router;
exports.products = products;
