"use strict";

var Product = require("../models/Product");

exports.getAllProducts = function (req, res, next) {
  // Product.findAll()
  req.user.getProducts().then(function (products) {
    return res.render("admin/adminProducts", {
      pageTitle: "Admin Products",
      products: products,
      path: "/admin/admin-products"
    });
  })["catch"](function (err) {
    return console.log(err);
  });
};

exports.getAddProducts = function (req, res, next) {
  res.render("admin/add-product", {
    pageTitle: "Add Product",
    edit: false,
    path: "/admin/add-product"
  });
};

exports.postEditProduct = function (req, res, next) {
  var id = req.params.id; // Product.findByPk(id)

  req.user.getProducts({
    where: {
      id: id
    }
  }).then(function (products) {
    var product = products[0];
    if (!product) res.redirect("/");
    res.render("admin/add-product", {
      pageTitle: "Edit Product",
      product: product,
      edit: true,
      path: "/admin/update-product"
    });
  })["catch"](function (err) {
    return console.log(err);
  });
};

exports.getPostProduct = function (req, res, next) {
  var _req$body = req.body,
      productName = _req$body.productName,
      productPrice = _req$body.productPrice,
      productImage = _req$body.productImage,
      productDescription = _req$body.productDescription; // Product.create({
  //   name: productName,
  //   price: productPrice,
  //   image: productImage,
  //   description: productDescription,
  //   userId: req.user.id,
  // })
  //Alternate method

  req.user.createProduct({
    name: productName,
    price: productPrice,
    image: productImage,
    description: productDescription
  }).then(function (result) {
    console.log("CREATED PRODUCT");
    res.redirect("/admin/products");
  })["catch"](function (err) {
    return console.log(err);
  });
};

exports.updateProduct = function (req, res, next) {
  var _req$body2 = req.body,
      productId = _req$body2.productId,
      productName = _req$body2.productName,
      productPrice = _req$body2.productPrice,
      productImage = _req$body2.productImage,
      productDescription = _req$body2.productDescription;
  Product.findByPk(productId).then(function (product) {
    product.name = productName;
    product.image = productImage;
    product.price = productPrice;
    product.description = productDescription;
    return product.save();
  }).then(function (result) {
    console.log("UPDATED PRODUCT");
    res.redirect("/admin/products");
  })["catch"](function (err) {
    return console.log(err);
  });
};

exports.postDeleteProduct = function (req, res, next) {
  var id = req.params.id;
  Product.findByPk(id).then(function (product) {
    return product.destroy();
  }).then(function (result) {
    console.log("PRODUCT DELETED");
    res.redirect("/admin/products");
  })["catch"](function (err) {
    return console.log(err);
  });
};