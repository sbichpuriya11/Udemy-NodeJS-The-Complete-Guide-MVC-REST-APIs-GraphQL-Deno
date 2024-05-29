// importing modules
const express = require("express");
const admin_router = require("./routes/admin");
const shop_router = require("./routes/shop");
//const page_not_found_router = require("./routes/404");
const path = require("path");
const bodyParser = require("body-parser");

// Initializing express
const app = express();

// defining different templating engines
// Set the view engine to Pug
// app.set("view engine", "pug");

// Set the view engine to Handlebars
// app.engine('handlebars', exphbs());
// app.set('view engine', 'handlebars');

// Set the view engine to ejs
app.set("view engine", "ejs");
app.set("views", "views");

// defining the static folder path
app.use(express.static(path.join(__dirname, "public")));

// defining the 3rd party middle ware to parse incoming req
app.use(bodyParser.urlencoded({ extended: true }));

// defining routes
app.use("/", admin_router.router);
app.use(shop_router);
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "views", "404.html"));
});
// app.use(page_not_found_router);

// defining the server port
app.listen(3000);
