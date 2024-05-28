const express = require("express");

const router = express.Router();

const path = require("path");
const { products } = require("./admin");

router.get("/", (req, res, next) => {
  //res.sendFile(path.join(__dirname, "../", "views", "shop.html"));
  res.render("shop", {
    pageTitle: "Shop",
    prods: products,
    hasProducts: products.length > 0,
    activeShop: true,
    productCSS: true,
    // layout:false  //if no need to render the default layout
  });
});

module.exports = router;
