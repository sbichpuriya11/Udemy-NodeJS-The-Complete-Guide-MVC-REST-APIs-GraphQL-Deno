const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const adminRouter = require("./routes/admin");
const shopRouter = require("./routes/shop");
const expressHbs = require("express-handlebars");

const app = express();

//defining template engines
app.engine("handlebars", expressHbs());
app.set("view engine", "handlebars");
app.set("views", "views");

//defining middlewares
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(shopRouter);

app.use("/admin", adminRouter.routes);

app.use("/", (req, res, next) => {
  //res.sendFile(path.join(__dirname, "views", "404.html"));

  //using handlebars
  res.render("404", { pageTitle: "Page not found" });
});

app.listen(3000);
