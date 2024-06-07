const products = [];
const path = require("path");
const fs = require("fs");
const ShortUniqueId = require("short-unique-id");
const e = require("express");

const filePath = path.join(__dirname, "..", "data", "products.json");

const getProductsFromFile = (cb) => {
  fs.readFile(filePath, (err, fileContent) => {
    if (err) return cb([]);
    cb(JSON.parse(fileContent));
  });
};

exports.Product = class {
  constructor(id, productName, productPrice, productImage, productDescription) {
    this.id = id;
    this.productName = productName;
    this.productPrice = productPrice;
    this.productImage = productImage;
    this.productDescription = productDescription;
  }

  save() {
    getProductsFromFile((products) => {
      if (this.id) {
        const existingProductIndex = products.findIndex(
          (prod) => prod.uid === this.id
        );
        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = {
          uid: this.id,
          productName: this.productName,
          productPrice: this.productPrice,
          productImage: this.productImage,
          productDescription: this.productDescription,
        };
        console.log(updatedProducts);
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
