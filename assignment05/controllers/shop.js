const { Cart } = require("../models/Cart");
const { Product } = require("../models/Product");

exports.getAllProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop", { pageTitle: "Home", products: products });
  });
};

exports.postAddToCart = (req, res, next) => {
  const productId = req.body.productId;
  Product.getProductById(productId, (product) =>
    Cart.addProduct(productId, product.price)
  );

  res.redirect("/");
};

exports.getCart = (req, res, next) => {
  Cart.getCart((cart) => {
    const cartProducts = cart.products;
    Product.fetchAll((products) => {
      const cartData = [];
      for (product of cartProducts) {
        const fetchedProduct = products.find((prod) => prod.id === product.id);
        if (fetchedProduct) {
          const cartItem = {
            qty: product.qty,
            product: fetchedProduct,
          };
          cartData.push(cartItem);
        }
      }
      res.render("cart", {
        pageTitle: "Cart",
        products: cartData,
        cartTotalPrice: cart.totalPrice,
      });
    });
  });
};

exports.getAdminProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("adminProducts", {
      pageTitle: "Admin Panel",
      products: products,
    });
  });
};
