// const http = require("http");
const express = require("express");

const app = express();

app.use((req, res, next) => {
  console.log("In the middleware!");

  //pass call to next middleware inline in this file
  next();
});

app.use((req, res, next) => {
  console.log("In another middleware!");
  //... post actions

  // Auto detects body type is html
  res.send(
    "<h1 style='font-family:sf pro display light'>Hello from Express!</h1>"
  );
});

//createServer should go at the last
// const server = http.createServer(app);
// server.listen(3000);

app.listen(3000);
