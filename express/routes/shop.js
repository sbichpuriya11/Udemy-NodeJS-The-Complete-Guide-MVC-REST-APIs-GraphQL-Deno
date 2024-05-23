const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.send(`<h3 style='font-family:sf pro display'>Hello from express!!</h3>`);
});

module.exports = router;
