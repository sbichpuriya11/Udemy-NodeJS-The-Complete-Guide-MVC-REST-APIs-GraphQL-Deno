"use strict";

var express = require("express");

var path = require("path");

var admin_router = require("./routes/admin");

var shop_router = require("./routes/shop");

var bodyParser = require("body-parser");

var sequelize = require("./utils/database");

var Product = require("./models/Product");

var User = require("./models/User");

var app = express();
app.set("view engine", "ejs");
app.set("views", "views");
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express["static"](path.join(__dirname, "public")));
app.use(function (req, res, next) {
  User.findByPk(1).then(function (user) {
    console.log("USER:", user);
    req.user = user;
    next();
  })["catch"](function (err) {
    return console.log(err);
  });
});
app.use("/admin", admin_router);
app.use(shop_router);
app.use("/", function (req, res, next) {
  res.render("404", {
    pageTitle: "404 | Page not found",
    path: ""
  });
});
Product.belongsTo(User, {
  constraints: true,
  onDelete: "CASCADE"
});
User.hasMany(Product);
sequelize // .sync({ force: true })
.sync().then(function (result) {
  return User.findByPk(1);
}).then(function (user) {
  if (!user) {
    return User.create({
      name: "Max",
      email: "test@test.com"
    });
  }

  return user;
}).then(function (user) {
  console.log(user);
  app.listen(3000);
})["catch"](function (err) {
  return console.log(err);
});