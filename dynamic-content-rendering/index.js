const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const path = require("path");

app.set("view engine", "pug");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));

//registering static folder
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes.routes);

app.use(shopRoutes);

app.use((req, res, next) => {
  // res
  //   .status(404)
  //   .sendFile(path.join(__dirname, "views", "page-not-found.html"));

  //displaying dynamic content
  res.render("404", { pageTitle: "Page not found" });
});

//should go at last after defining and setting up all routes/models and code logic
app.listen(3000);
