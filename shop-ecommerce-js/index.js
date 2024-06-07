// importing modules
const express = require("express");
const admin_router = require("./routes/admin");
const shop_router = require("./routes/shop");
const error = require("./controllers/error");
const path = require("path");
const bodyParser = require("body-parser");

// Initializing express
const app = express();

// Set the view engine to ejs
app.set("view engine", "ejs");
app.set("views", "views");

// defining the static folder path
app.use(express.static(path.join(__dirname, "public")));

// defining the 3rd party middle ware to parse incoming req
app.use(bodyParser.urlencoded({ extended: true }));

// defining routes
app.use("/admin", admin_router);
app.use(shop_router);
app.use(error.notFound);
// app.use(page_not_found_router);

// defining the server port
app.listen(3000);
