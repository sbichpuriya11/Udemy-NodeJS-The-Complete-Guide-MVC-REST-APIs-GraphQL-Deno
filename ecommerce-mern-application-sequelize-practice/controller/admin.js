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
  // const userId = req.user.id;
  // Product.create({
  //   title,
  //   price,
  //   imageUrl,
  //   description,
  //   userId: userId,
  // })
  //   .then((result) => console.log(result))
  //   .catch((error) => console.log(error));

  // Another way
  req.user
    .createProduct({
      title,
      price,
      imageUrl,
      description,
    })
    .then((result) => console.log(result))
    .catch((error) => console.log(error));

  res.redirect("/");
};

exports.getAllAdminProducts = (req, res, next) => {
  // Product.findAll()
  req.user
    .getProducts()
    .then((result) => {
      res.render("admin/adminProducts.ejs", {
        path: "/admin/adminProducts",
        products: result,
        pageTitle: "Admin Products",
      });
    })
    .catch((error) => console.log(error));
};

exports.postUpdateProductRegistrationPage = (req, res, next) => {
  const prodId = req.params.id;
  //Product.findByPk(prodId)
  req.user
    .getProducts({ where: { id: prodId } }) //returns list of products
    .then((products) => {
      const result = products[0];
      res.render("admin/addProductPage.ejs", {
        pageTitle: result.title,
        action: "edit",
        product: result,
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
      res.redirect("/admin/getProducts");
    })
    .catch((error) => console.log(error));
};

exports.getDeleteProduct = (req, res, next) => {
  const id = req.params.id;
  Product.findByPk(id)
    .then((result) => {
      result.destroy();
    })
    .then(() => {
      res.redirect("/admin/getProducts");
    })
    .catch((error) => console.log(error));
};
