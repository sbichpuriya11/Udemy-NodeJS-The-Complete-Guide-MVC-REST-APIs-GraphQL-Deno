const path = require("path");
const fs = require("fs");

const filePath = path.join(__dirname, "..", "data", "cart.json");
exports.Cart = class {
  // constructor() {
  //     this.products = [];
  //     this.totalPrice = 0;

  // }

  static addProduct(id, productPrice) {
    //Fetch the previous cart
    fs.readFile(filePath, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
      }

      //Analyze the cart => Find existing product
      const existingProductIndex = cart.products.findIndex(
        (prod) => prod.uid === id
      );
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;
      //Add new product/ increate quantity
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { uid: id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice = cart.totalPrice + +productPrice;
      fs.writeFile(filePath, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }

  static deleteProduct(id, productPrice) {
    fs.readFile(filePath, (err, fileContent) => {
      if (err) return;
      const updatedCart = { ...JSON.parse(fileContent) };
      const product = updatedCart.products.find((prod) => prod.uid === id);
      if (!product) return;
      const productQty = product.qty;
      updatedCart.products = updatedCart.products.filter(
        (prod) => prod.uid !== id
      );
      updatedCart.totalPrice =
        updatedCart.totalPrice - productPrice * productQty;
      fs.writeFile(filePath, JSON.stringify(updatedCart), (err) => {
        console.log(err);
      });
    });
  }

  static getCart(cb) {
    fs.readFile(filePath, (err, fileContent) => {
      const cart = JSON.parse(fileContent);
      if (err) {
        cb(null);
      } else {
        cb(cart);
      }
    });
  }
};
