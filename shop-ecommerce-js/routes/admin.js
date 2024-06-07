const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin");

// /admin/add-products => GET
router.get("/add-product", adminController.getAddProducts);

// /admin/add-products => POST
router.post("/add-product", adminController.getPostProducts);

// /admin/products => GET
router.get("/products", adminController.getProducts);

module.exports = router;
