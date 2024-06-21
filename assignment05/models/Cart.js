const fs = require("fs");
const path = require("path");
const rootdir = require("../utils/path");
const filePath = path.join(rootdir, "data", "cart.json");
exports.Cart = class {
  static addProduct(id, price) {
    fs.readFile(filePath, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
      }

      const existingProductIndex = cart.products.findIndex(
        (product) => product.id === id
      );
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice = cart.totalPrice + +price;
      fs.writeFile(filePath, JSON.stringify(cart), (err) => {
        if (err) console.log(err);
      });
    });
  }

  static getCart(cb) {
    fs.readFile(filePath, (err, fileContent) => {
      const cart = { products: [], totalPrice: 0 };
      if (!err) cb(JSON.parse(fileContent));
      else cb(cart);
    });
  }

  static deleteCartData(id, price) {
    fs.readFile(filePath, (err, fileContent) => {
      if (err) console.log(err);
      else {
        let cart = { ...JSON.parse(fileContent) };
        let product = cart.products.find((prod) => prod.id === id);
        if (!product) return;
        let productQty = product.qty;
        cart.totalPrice = cart.totalPrice - productQty * price;
        cart.products = cart.products.filter((prod) => prod.id !== id);
        fs.writeFile(filePath, JSON.stringify(cart), (err) => {
          if (err) console.log(err);
        });
      }
    });
  }
};
