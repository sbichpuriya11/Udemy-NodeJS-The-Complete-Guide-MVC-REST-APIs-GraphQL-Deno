const express = require("express");
const app = express();
const path = require("path");
const products_router = require("./routes/products");
const shop_router = require("./routes/shop");
const bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.set("views", "views");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/products", products_router.router);
app.use(shop_router);

app.use("/", (req, res, next) => {
  // res.sendFile(path.join(__dirname, "views", "404.html"));
  res.render("404", { pageTitle: "404 | Page not found" });
});

app.listen(3000);
