const path = require("path");
const express = require("express");
const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.use("/api/users", (req, res, next) => {
  res.status(200).sendFile(path.join(__dirname, "views", "user.html"));
});
app.use("/api", (req, res, next) => {
  res.status(200).sendFile(path.join(__dirname, "views", "index.html"));
});

app.listen(3000);
