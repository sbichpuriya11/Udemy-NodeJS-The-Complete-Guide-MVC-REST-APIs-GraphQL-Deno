const { Product } = require("../models/product");

exports.getAddProducts = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) return res.redirect("/");
  const prodId = req.params.productId;
  Product.findById(prodId, (product) => {
    if (!product) {
      return res.redirect("/");
    }
    res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: editMode,
      product: product,
    });
  });
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const { productName, productPrice, productImage, productDescription } =
    req.body;
  const updatedProduct = new Product(
    prodId,
    productName,
    productPrice,
    productImage,
    productDescription
  );
  console.log(updatedProduct);
  updatedProduct.save();
  res.redirect("/admin/products");
};

exports.getPostProducts = (req, res, next) => {
  const { productName, productPrice, productDescription, productImage } =
    req.body;
  const product = new Product(
    null,
    productName,
    productPrice,
    productImage,
    productDescription
  );
  console.log("Product:", product);
  product.save();
  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("admin/products", {
      pageTitle: "Admin Products",
      prods: products,
      path: "/admin/products",
    });
  });
};

exports.postDeleteProduct = (req, res, next) => {
  const id = req.body.productId;
  Product.deleteById(id);
  res.redirect("/admin/products");
};
