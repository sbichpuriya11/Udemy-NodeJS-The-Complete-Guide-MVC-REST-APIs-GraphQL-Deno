const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const adminRouter = require("./routes/admin");
const shopRouter = require("./routes/shop");
const expressHbs = require("express-handlebars");

const app = express();

//defining template engines
app.engine(
  "handlebars",
  expressHbs({ layoutsDir: "views/layouts/", defaultLayout: "main-layout" })
); //pass configures for layouts
//for handlebars layout engine does not recognize hbs exntension, so we need to use handlebars only as an extension to layout file. so in configuration pass , extname:'hbs'

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
