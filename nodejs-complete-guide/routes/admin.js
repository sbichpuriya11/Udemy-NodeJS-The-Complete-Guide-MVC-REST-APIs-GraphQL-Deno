const express = require("express");

const router = express.Router();

// /admin/add-product => GET
router.get("/add-product", (req, res, next) => {
  res.send(
    `<form style='font-family:sf pro display' action="/admin/add-product" method="POST"><label>Product Title</label><br/><input type="text" name="title"/><button type="submit">Add Product</button></form>`
  );
});

///admin/add-product =>POST
router.post("/add-product", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});

module.exports = router;
