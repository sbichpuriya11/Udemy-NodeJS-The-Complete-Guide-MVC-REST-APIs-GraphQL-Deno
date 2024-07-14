const Order = require("../models/Order");
const Product = require("../models/Product");
exports.getShopHomePage = (req, res, next) => {
  Product.findAll()
    .then((result) => {
      res.render("shop/homePage.ejs", {
        path: "/",
        products: result,
        pageTitle: "Home Page",
      });
    })
    .catch((error) => console.log(error));
};

exports.getProductPage = (req, res, next) => {
  Product.findAll()
    .then((result) => {
      res.render("shop/productPage.ejs", {
        path: "/products",
        products: result,
        pageTitle: "Product List",
      });
    })
    .catch((error) => console.log(error));
};

exports.postProductDetail = (req, res, next) => {
  const id = req.body.productId;
  Product.findByPk(id)
    .then((result) =>
      res.render("shop/productDetails.ejs", {
        pageTitle: result.title,
        product: result,
        path: "",
      }),
    )
    .catch((error) => console.log(error));
};

exports.getCartData = (req, res, next) => {
  // console.log(req.user.cart); // Like this cart cannot be accessed.....
  req.user
    .getCart()
    .then((cart) => {
      return cart.getProducts();
    })
    .then((products) => {
      res.render("shop/cart.ejs", {
        path: "/cart",
        pageTitle: "Cart",
        products: products,
        cartTotal: products.find,
      });
    })
    .catch((error) => console.log(error));
};

exports.postAddProductToCart = (req, res, next) => {
  const productId = req.body.productId;
  let fetchedCart;
  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: productId } });
    })
    .then((products) => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }
      let newQuantity = 1;
      if (product) {
        let oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
        return fetchedCart.addProduct(product, {
          through: { quantity: newQuantity },
        });
      }
      return Product.findByPk(productId)
        .then((product) => {
          return fetchedCart.addProduct(product, {
            through: { quantity: newQuantity },
          });
        })
        .catch((error) => console.log(error));
    })
    .then(() => {
      res.redirect("/cart");
    })
    .catch((error) => console.log(error));
};

exports.postDeleteProductFromCart = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .getCart()
    .then((cart) => {
      return cart.getProducts({ where: { id: prodId } });
    })
    .then((products) => {
      const product = products[0];
      product.cartItem.destroy();
    })
    .then((result) => {
      res.redirect("/cart");
    })
    .catch((error) => console.log(error));
};

exports.postCreateOrder = (req, res, next) => {
  let fetchedCart;
  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts();
    })
    .then((products) => {
      return req.user
        .createOrder()
        .then((order) => {
          return order.addProducts(
            products.map((product) => {
              product.orderItem = { quantity: product.cartItem.quantity };
              return product;
            }),
          );
        })
        .catch((error) => console.log(error));
    })
    .then((result) => {
      return fetchedCart.setProducts(null);
    })
    .then((result) => {
      res.redirect("/orders");
    })
    .catch((error) => console.log(error));
};

exports.getOrdersDetails = (req, res, next) => {
  req.user.getOrders({ include: ["products", "user"] }).then((orders) => {
    res.render("shop/ordersPage.ejs", {
      path: "/orders",
      orders: orders,
      pageTitle: "Order History",
    });
  });
};
