const express = require("express");

const router = express.Router();

router.get("/add-product", (req, res, next) => {
  res.send(
    `<form style='font-family:sf pro display' action="/product" method="POST"><label>Product Title</label><br/><input type="text" name="title"/><button type="submit">Add Product</button></form>`
  );
});

router.post("/product", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});

module.exports = router;
