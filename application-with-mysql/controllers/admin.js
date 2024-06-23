const { Product } = require("../models/Product");

exports.getAllProducts = (req, res, next) => {
  Product.fetchAll()
    .then(([result, fieldData]) => {
      res.render("admin/adminProducts", {
        pageTitle: "Admin Products",
        products: result,
        path: "/admin/admin-products",
      });
    })
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
  Product.getProductById(id)
    .then(([result, fieldData]) => {
      res.render("admin/add-product", {
        pageTitle: "Edit Product",
        product: result[0],
        edit: true,
        path: "/admin/update-product",
      });
    })
    .catch((err) => console.log(err));
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
  product
    .saveProduct()
    .then(() => res.redirect("/"))
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

  Product.updateProductById({
    productId,
    productName,
    productPrice,
    productImage,
    productDescription,
  })
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
  const id = req.params.id;
  Product.deleteProductById(id)
    .then(([result, fieldData]) => res.redirect("/"))
    .catch((err) => console.log(err));
};
