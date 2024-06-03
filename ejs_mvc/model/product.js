const products = [];
const fs = require("fs");
const path = require("path");
const root_path = require("../utils/path");

const filePath = path.join(root_path, "data", "products.json");

const getProductsFromFile = (cb) => {
  fs.readFile(filePath, (err, fileContent) => {
    if (err) return cb([]);
    cb(JSON.parse(fileContent));
  });
};
module.exports = class Product {
  constructor(productName, productPrice, productImage, productDescription) {
    this.productName = productName;
    this.productPrice = productPrice;
    this.productImage = productImage;
    this.productDescription = productDescription;
  }

  save() {
    getProductsFromFile((products) => {
      products.push(this);
      fs.writeFile(filePath, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }
};
