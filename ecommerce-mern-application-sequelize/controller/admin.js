const Product = require("../models/Product");
exports.getAddProductPage = (req, res, next) => {
  res.render("admin/addProductPage.ejs", {
    path: "/admin/add-products",
    pageTitle: "Register Product",
    action: "create",
  });
};

exports.postAddProduct = (req, res, next) => {
  const { title, price, imageUrl, description } = req.body;
  req.user
    .createProduct({ title, price, imageUrl, description })
    .then((result) => console.log(result))
    .catch((error) => console.log(error));
  res.redirect("/");
};

exports.getAllAdminProducts = (req, res, next) => {
  req.user
    .getProducts()
    .then((result) => {
      res.render("admin/adminProducts.ejs", {
        path: "/admin/products",
        products: result,
        pageTitle: "Admin Products",
      });
    })
    .catch((error) => console.log(error));
};

exports.postUpdateProductRegistrationPage = (req, res, next) => {
  const id = req.params.id;
  req.user
    .getProducts({ where: { id: id } })
    .then((result) => {
      let product = result[0];
      res.render("admin/addProductPage.ejs", {
        pageTitle: product.title,
        action: "edit",
        product: product,
        path: "",
      });
    })
    .catch((error) => console.log(error));
};

exports.postUpdateProduct = (req, res, next) => {
  const id = req.body.productId;
  const { title, price, imageUrl, description } = req.body;
  Product.findByPk(id)
    .then((result) => {
      result.title = title;
      result.description = description;
      result.price = price;
      result.imageUrl = imageUrl;
      result.save();
      res.redirect("/admin/products");
    })
    .catch((error) => console.log(error));
};

exports.getDeleteProduct = (req, res, next) => {
  const id = req.params.id;
  Product.findByPk(id)
    .then((result) => {
      result.destroy();
    })
    .then((result) => {
      res.redirect("/admin/products");
    })
    .catch((error) => console.log(error));
};
