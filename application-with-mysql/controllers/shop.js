const Product = require("../models/Product");

exports.getAllProducts = (req, res, next) => {
  req.user
    .getProducts()
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
  let newQuantity = 1;
  let fetchedCart;
  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: productId } });
    })
    .then((products) => {
      let product;
      if (products.length > 0) product = products[0];

      if (product) {
        //....
        const oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
        return product;
      }
      return Product.findByPk(productId);
    })
    .then((product) => {
      return fetchedCart
        .addProduct(product, {
          through: { quantity: newQuantity },
        })
        .catch((err) => console.log(err));
    })
    .then(() => {
      res.redirect("/cart");
    })
    .catch((err) => console.log(err));
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
  req.user.getCart().then((cart) => {
    return cart
      .getProducts()
      .then((products) => {
        let totalPrice = 0;
        products.forEach((product) => {
          totalPrice += product.cartItem.quantity * product.price;
        });

        res.render("shop/cart", {
          pageTitle: "Cart",
          products: products,
          cartTotalPrice: totalPrice,
          path: "/cart",
        });
      })
      .catch((err) => console.log(err));
  });
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
      console.log(products);
      return req.user
        .createOrder()
        .then((order) => {
          return order.addProducts(
            products.map((product) => {
              product.orderItem = { quantity: product.cartItem.quantity };
              return product;
            })
          );
        })
        .catch((err) => console.log(err));
    })
    .then((result) => {
      return fetchedCart.setProducts(null);
    })
    .then((result) => res.redirect("/orders"))
    .catch((err) => console.log(err));
};

exports.getOrders = (req, res, next) => {
  req.user.getOrders({ include: ["user", "products"] }).then((orders) => {
    res.render("shop/orders.ejs", {
      pageTitle: "Order Summary",
      path: "/orders",
      orders: orders,
    });
  });
};
