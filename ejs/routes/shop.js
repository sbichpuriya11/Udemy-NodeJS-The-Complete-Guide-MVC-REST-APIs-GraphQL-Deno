const express = require("express");
const router = express.Router();
const path = require("path");
const products = require("./admin");

router.get("/", (req, res, next) => {
  console.log(products.products.length);
  //res.sendFile(path.join(__dirname, "../", "views", "shop.html"));
  res.render("shop", { pageTitle: "Shop", prods: products.products });
});

module.exports = router;
