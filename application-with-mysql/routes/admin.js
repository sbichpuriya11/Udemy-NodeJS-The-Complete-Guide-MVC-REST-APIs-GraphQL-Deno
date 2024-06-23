const express = require("express");
const router = express.Router();

const {
  getAddProducts,
  getPostProduct,
  postEditProduct,
  postDeleteProduct,
  updateProduct,
  getAllProducts,
} = require("../controllers/admin");

const { postProductDetails } = require("../controllers/shop");

router.get("/products", getAllProducts);

router.get("/add-product", getAddProducts);

router.post("/add-product", getPostProduct);

router.get("/edit-product/:id", postEditProduct);

router.get("/delete-product/:id", postDeleteProduct);

router.get("/:id", postProductDetails);

router.post("/edit-product", updateProduct);

module.exports = router;
