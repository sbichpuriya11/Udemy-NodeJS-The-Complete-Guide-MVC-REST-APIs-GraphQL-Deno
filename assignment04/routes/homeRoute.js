const express = require("express");
const route = express.Router();
const path = require("path");
const { userData } = require("./userRoute");

route.get("/", (req, res, next) => {
  //res.sendFile(path.join(__dirname, "..", "views", "homePage.html"));
  res.render("homePage", { pageTitle: "Home Page", userData: userData });
});

module.exports = route;
