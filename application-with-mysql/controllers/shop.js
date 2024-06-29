const { Cart } = require("../models/Cart");
const Product = require("../models/Product");

exports.getAllProducts = (req, res, next) => {
  Product.findAll()
    .then((products) =>
      res.render("shop/shop", {
        pageTitle: "Admin Products",
        products: products,
        path: "/",
      })
    )
    .catch((err) => console.log(err));
};

exports.postAddToCart = (req, res, next) => {
  const productId = req.body.productId;
  Product.getProductById(productId, (product) =>
    Cart.addProduct(productId, product.price)
  );

  res.redirect("/");
};

exports.postProductDetails = (req, res, next) => {
  const id = req.params.id;
  // Product.findAll({ where: { id: id } })
  Product.findByPk(id)
    .then((result) => {
      res.render("shop/product", {
        pageTitle: "Product Info",
        product: result,
        path: "/",
      });
    })
    .catch((err) => console.log(err));
};

exports.getCart = (req, res, next) => {
  res.render("shop/cart", {
    pageTitle: "Cart",
    products: [],
    cartTotalPrice: 0,
    path: "/cart",
  });
};
