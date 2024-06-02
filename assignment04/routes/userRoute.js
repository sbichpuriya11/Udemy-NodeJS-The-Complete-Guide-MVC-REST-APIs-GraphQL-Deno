const express = require("express");

const route = express.Router();

const path = require("path");

const userData = [];

route.get("/", (req, res, next) => {
  // res.sendFile(path.join(__dirname, "..", "views", "userForm.html"));
  res.render("userForm", { pageTitle: "Register User" });
});

route.post("/", (req, res, next) => {
  const { name, email, message } = req.body;
  userData.push({ name, email, message });
  console.log(userData);
  res.redirect("/");
});

exports.route = route;
exports.userData = userData;
