const express = require("express");
const router = express.Router();
const path = require("path");
const products = require("./admin");

router.get("/", (req, res, next) => {
  console.log(products.products);
  res.sendFile(path.join(__dirname, "../", "views", "shop.html"));
});

module.exports = router;
