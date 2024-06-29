const express = require("express");

const path = require("path");
const admin_router = require("./routes/admin");
const shop_router = require("./routes/shop");
const bodyParser = require("body-parser");

const sequelize = require("./utils/database");
const Product = require("./models/Product");
const User = require("./models/User");

const app = express();
app.set("view engine", "ejs");
app.set("views", "views");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      console.log("USER:", user);
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", admin_router);
app.use(shop_router);

app.use("/", (req, res, next) => {
  res.render("404", { pageTitle: "404 | Page not found", path: "" });
});

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);

sequelize
  // .sync({ force: true })
  .sync()
  .then((result) => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: "Max", email: "test@test.com" });
    }
    return user;
  })
  .then((user) => {
    console.log(user);
    app.listen(3000);
  })
  .catch((err) => console.log(err));
