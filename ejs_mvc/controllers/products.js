const Product = require("../model/product");
exports.getAddProducts = (req, res, next) => {
  // res.sendFile(path.join(__dirname, "..", "views", "add-product.html"));
  res.render("add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
  });
};

exports.postAddProducts = (req, res, next) => {
  const { productName, productPrice, productDescription, productImage } =
    req.body;
  const product = new Product(
    productName,
    productPrice,
    productImage,
    productDescription
  );
  product.save();
  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  //res.sendFile(path.join(__dirname, "../", "views", "shop.html"));
  Product.fetchAll((products) => {
    res.render("shop", { pageTitle: "Shop", prods: products });
  });
};
