const { Product } = require("../models/Product");

exports.getAddProducts = (req, res, next) => {
  // res.sendFile(path.join(__dirname, "..", "views", "add-product.html"));
  res.render("add-product", {
    pageTitle: "Add Product",
    edit: false,
  });
};

exports.getPostProduct = (req, res, next) => {
  const { productName, productPrice, productImage, productDescription } =
    req.body;
  const product = new Product(
    null,
    productName,
    productPrice,
    productImage,
    productDescription
  );
  product.saveProduct();
  res.redirect("/");
};

exports.postEditProduct = (req, res, next) => {
  const id = req.params.id;
  Product.getProductById(id, (product) => {
    res.render("add-product", {
      pageTitle: "Edit Product",
      product: product,
      edit: true,
    });
  });
};

exports.postDeleteProduct = (req, res, next) => {
  const id = req.params.id;
  Product.deleteProductById(productId);
  res.redirect("/");
};

exports.postProductDetails = (req, res, next) => {
  const id = req.params.id;
  Product.getProductById(id, (product) => {
    res.render("product", {
      pageTitle: "Product Info",
      product: product,
    });
  });
};

exports.updateProduct = (req, res, next) => {
  const {
    productId,
    productName,
    productPrice,
    productImage,
    productDescription,
  } = req.body;
  const product = new Product(
    productId,
    productName,
    productPrice,
    productImage,
    productDescription
  );
  product.saveProduct();
  res.redirect("/");
};
