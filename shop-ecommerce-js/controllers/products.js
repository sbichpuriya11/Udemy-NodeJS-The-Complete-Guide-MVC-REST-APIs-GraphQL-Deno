const { Product } = require("../models/product__");
exports.getAddProducts = (req, res, next) => {
  res.render("add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
  });
};

exports.getPostProducts = (req, res, next) => {
  const { productName, productPrice, productDescription, productImage } =
    req.body;
  const product = new Product(
    productName,
    productPrice,
    productDescription,
    productImage
  );
  product.save();
  res.redirect("/");
};

exports.displayProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop", { pageTitle: "Shop", prods: products });
  });
};
