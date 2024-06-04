const express = require("express");
const router = express.Router();
const productsController = require("../controllers/products");

router.get("/admin/add-product", productsController.getAddProducts);

router.post("/admin/add-product", productsController.getPostProducts);

module.exports = router;
