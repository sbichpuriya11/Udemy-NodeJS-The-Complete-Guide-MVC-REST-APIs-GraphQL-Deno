const products = [];
const fs = require("fs");
const path = require("path");
const root_path = require("../utils/path");
module.exports = class Product {
  constructor(productName, productPrice, productImage, productDescription) {
    this.productName = productName;
    this.productPrice = productPrice;
    this.productImage = productImage;
    this.productDescription = productDescription;
  }

  save() {
    const filePath = path.join(root_path, "data", "products.json");
    fs.readFile(filePath, (err, fileContent) => {
      let products = [];
      if (!err) {
        products = JSON.parse(fileContent);
      }

      products.push(this);
      fs.writeFile(filePath, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
    products.push(this);
  }

  static fetchAll(cb) {
    const filePath = path.join(root_path, "data", "products.json");
    fs.readFile(filePath, (err, fileContent) => {
      if (err) cb([]);
      cb(JSON.parse(fileContent));
    });
  }
};
