const products = [];
const path = require("path");
const fs = require("fs");
const ShortUniqueId = require("short-unique-id");
const e = require("express");
const { Cart } = require("./cart");

const filePath = path.join(__dirname, "..", "data", "products.json");

const getProductsFromFile = (cb) => {
  fs.readFile(filePath, (err, fileContent) => {
    if (err) return cb([]);
    cb(JSON.parse(fileContent));
  });
};

exports.Product = class {
  constructor(
    uid,
    productName,
    productPrice,
    productImage,
    productDescription
  ) {
    this.uid = uid;
    this.productName = productName;
    this.productPrice = productPrice;
    this.productImage = productImage;
    this.productDescription = productDescription;
  }

  save() {
    getProductsFromFile((products) => {
      if (this.uid) {
        const existingProductIndex = products.findIndex(
          (prod) => prod.uid === this.uid
        );
        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = {
          uid: this.uid,
          productName: this.productName,
          productPrice: this.productPrice,
          productImage: this.productImage,
          productDescription: this.productDescription,
        };
        fs.writeFile(filePath, JSON.stringify(updatedProducts), (err) => {
          console.log(err);
        });
      } else {
        this.uid = new ShortUniqueId({ length: 10 }).rnd().toString();
        products.push(this);
        fs.writeFile(filePath, JSON.stringify(products), (err) => {
          console.log(err);
        });
      }
    });
  }

  static deleteById(id) {
    getProductsFromFile((products) => {
      const product = products.find((prod) => prod.uid === id);
      const updatedProducts = products.filter((p) => p.uid !== id);
      fs.writeFile(filePath, JSON.stringify(updatedProducts), (err) => {
        if (!err) {
          Cart.deleteProduct(id, product.productPrice);
        }
      });
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findById(id, cb) {
    getProductsFromFile((products) => {
      const product = products.find((p) => p.uid === id);
      cb(product);
    });
  }
};
