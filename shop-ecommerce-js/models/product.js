const products = [];
const path = require("path");
const fs = require("fs");
exports.Product = class {
  constructor(productName, productPrice, productImage, productDescription) {
    this.productName = productName;
    this.productPrice = productPrice;
    this.productImage = productImage;
    this.productDescription = productDescription;
  }

  save() {
    const filePath = path.join(
      path.dirname(process.mainModule.filename),
      "data",
      "products.json"
    );
    fs.readFile(filePath, (err, fileData) => {
      let products = [];
      if (!err) {
        products = JSON.parse(fileData);
      }
      products.push(this);
      fs.writeFile(filePath, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    const filePath = path.join(
      path.dirname(process.mainModule.filename),
      "data",
      "products.json"
    );
    fs.readFile(filePath, (err, fileData) => {
      if (err) {
        cb([]);
      } else {
        cb(JSON.parse(fileData));
      }
    });
  }
};
