const Product = require("../models/Product");

exports.getAllProducts = (req, res, next) => {
  Product.findAll()
    .then((products) =>
      res.render("admin/adminProducts", {
        pageTitle: "Admin Products",
        products: products,
        path: "/admin/admin-products",
      })
    )
    .catch((err) => console.log(err));
};

exports.getAddProducts = (req, res, next) => {
  res.render("admin/add-product", {
    pageTitle: "Add Product",
    edit: false,
    path: "/admin/add-product",
  });
};

exports.postEditProduct = (req, res, next) => {
  const id = req.params.id;
  console.clear();
  Product.findByPk(id)
    .then((product) => {
      if (!product) res.redirect("/");
      res.render("admin/add-product", {
        pageTitle: "Edit Product",
        product: product,
        edit: true,
        path: "/admin/update-product",
      });
    })
    .catch((err) => console.log(err));
};

exports.getPostProduct = (req, res, next) => {
  const { productName, productPrice, productImage, productDescription } =
    req.body;
  Product.create({
    name: productName,
    price: productPrice,
    image: productImage,
    description: productDescription,
  })
    .then((result) => {
      console.log("CREATED PRODUCT");
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};

exports.updateProduct = (req, res, next) => {
  const {
    productId,
    productName,
    productPrice,
    productImage,
    productDescription,
  } = req.body;
  Product.findByPk(productId)
    .then((product) => {
      product.name = productName;
      product.image = productImage;
      product.price = productPrice;
      product.description = productDescription;
      return product.save();
    })
    .then((result) => {
      console.log("UPDATED PRODUCT");
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
  const id = req.params.id;
  Product.findByPk(id)
    .then((product) => {
      return product.destroy();
    })
    .then((result) => {
      console.log("PRODUCT DELETED");
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};
