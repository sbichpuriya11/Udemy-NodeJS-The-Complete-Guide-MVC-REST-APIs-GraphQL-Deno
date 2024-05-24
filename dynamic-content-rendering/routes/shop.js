const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/", (req, res, next) => {
  // res.send(`<h3 style='font-family:sf pro display'>Hello from express!!</h3>`);
  res.sendFile(path.join(__dirname, "../", "views", "shop.html")); // either ../ or .. both are valid
});

module.exports = router;
