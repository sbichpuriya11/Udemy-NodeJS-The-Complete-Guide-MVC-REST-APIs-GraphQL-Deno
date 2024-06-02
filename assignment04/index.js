const express = require("express");
const home_route = require("./routes/homeRoute");
const user_route = require("./routes/userRoute");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/user", user_route.route);

app.use(home_route);

app.use("/", (req, res, next) => {
  //res.sendFile(path.join(__dirname, "views", "404.html"));
  res.render("404", { pageTitle: "Page Not Foud" });
});

app.listen(3000);
