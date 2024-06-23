const express = require("express");
const app = express();
const path = require("path");
const admin_router = require("./routes/admin");
const shop_router = require("./routes/shop");
const bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.set("views", "views");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/admin", admin_router);
app.use(shop_router);

app.use("/", (req, res, next) => {
  res.render("404", { pageTitle: "404 | Page not found", path: "" });
});

app.listen(3000);
