const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(adminRoutes);

app.use(shopRoutes);

app.use((req, res, next) => {
  res
    .status(404)
    .send('<h3 style="font-family:sf pro display">Page not found</h3>');
});

//should go at last after defining and setting up all routes/models and code logic
app.listen(3000);
