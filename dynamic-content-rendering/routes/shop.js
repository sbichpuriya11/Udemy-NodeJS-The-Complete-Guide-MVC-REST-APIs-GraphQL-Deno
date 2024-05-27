const express = require("express");
const router = express.Router();
const path = require("path");
const product = require("./admin");

router.get("/", (req, res, next) => {
  const products = product.products;
  // res.send(`<h3 style='font-family:sf pro display'>Hello from express!!</h3>`);
  //res.sendFile(path.join(__dirname, "../", "views", "shop.html")); // either ../ or .. both are valid
  res.render("shop", { prods: products, pageTitle: "Shop", path: "/" });
});

module.exports = router;
