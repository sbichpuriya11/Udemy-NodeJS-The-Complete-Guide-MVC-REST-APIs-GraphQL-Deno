const express = require("express");
const app = express();

app.use("/", (req, res, next) => {
  console.log("This endpoint will always work!");
  next();
});

app.use("/add-product", (req, res, next) => {
  res.send(`<h3 style='font-family:sf pro display'>Add Product</h3>`);

  //if we call next() here then code will break, since we already send res to client. And indeed it's not a good practice to redirect from /add-product to /
});

app.use("/", (req, res, next) => {
  res.send(`<h3 style='font-family:sf pro display'>Hello from express!!</h3>`);
});

//should go at last after defining and setting up all routes/models and code logic
app.listen(3000);
