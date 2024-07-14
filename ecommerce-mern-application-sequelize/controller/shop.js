const path = require("path");
const Product = require("../models/Product");
exports.getShopHomePage = (req, res, next) => {
  //Product.findAll()
  req.user
    .getProducts()
    .then((result) => {
      res.render("shop/homePage.ejs", {
        path: "/",
        products: result,
        pageTitle: "Home Page",
      });
    })
    .catch((error) => console.log(error));
};

exports.getProductsPage = (req, res, next) => {
  req.user.getProducts().then((products) =>
    res.render("shop/productsPage.ejs", {
      products: products,
      pageTitle: "Products",
      path: "/products",
    }),
  );
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

exports.postAddToCart = (req, res, next) => {
  const prodId = req.body.productId;
  let fetchedCart;
  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: prodId } });
    })
    .then((products) => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }
      let newQuantity = 1;
      if (product) {
        const oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
        return fetchedCart.addProduct(product, {
          through: { quantity: newQuantity },
        });
      }

      return Product.findByPk(prodId).then((product) => {
        return fetchedCart.addProduct(product, {
          through: { quantity: newQuantity },
        });
      });
    })
    .then((result) => res.redirect("/cart"))
    .catch((err) => console.log(err));
};

exports.getCartDetails = (req, res, next) => {
  req.user
    .getCart()
    .then((cart) => {
      return cart.getProducts();
    })
    .then((products) => {
      res.render("shop/cart.ejs", {
        pageTitle: "Cart",
        path: "/cart",
        products: products,
        totalPrice: products
          .map((product) => product.price * product.cartItem.quantity)
          .reduce((accumulator, currentValue) => accumulator + currentValue, 0),
      });
    })
    .catch((error) => console.log(error));
};

exports.postDeleteProductFromCart = (req, res, next) => {
  const id = req.body.productId;
  req.user
    .getCart()
    .then((cart) => {
      return cart.getProducts({ where: { id: id } });
    })
    .then((products) => {
      let product = products[0];
      product.cartItem.destroy();
    })
    .then((result) => res.redirect("/cart"))
    .catch((err) => console.log(err));
};

exports.createOrder = (req, res, next) => {
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
    .catch((err) => console.log(err));
};

exports.showAllOrders = (req, res, next) => {
  req.user.getOrders({ include: ["user", "products"] }).then((orders) => {
    res.render("shop/orderList.ejs", {
      pageTitle: "Orders",
      path: "/orders",
      orders: orders,
    });
  });
};
