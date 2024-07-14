const express = require("express");
const { pageNotFound } = require("../controller/404");
const router = express.Router();

router.get("/", pageNotFound);

module.exports = router;
