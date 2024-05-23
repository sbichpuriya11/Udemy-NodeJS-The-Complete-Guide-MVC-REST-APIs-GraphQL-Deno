const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/add-product", (req, res, next) => {
  res.send(
    `<form style='font-family:sf pro display' action="/product" method="POST"><label>Product Title</label><br/><input type="text" name="title"/><button type="submit">Add Product</button></form>`
  );
});

app.post("/product", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});

app.use("/", (req, res, next) => {
  res.send(`<h3 style='font-family:sf pro display'>Hello from express!!</h3>`);
});

//should go at last after defining and setting up all routes/models and code logic
app.listen(3000);
