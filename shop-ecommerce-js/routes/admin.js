const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin");

// /admin/add-products => GET
router.get("/add-product", adminController.getAddProducts);

// /admin/add-products => POST
router.post("/add-product", adminController.getPostProducts);

router.get("/edit-product/:productId", adminController.getEditProduct);

router.post("/edit-product", adminController.postEditProduct);

// /admin/products => GET
router.get("/products", adminController.getProducts);

router.post("/delete-product", adminController.postDeleteProduct);

module.exports = router;
