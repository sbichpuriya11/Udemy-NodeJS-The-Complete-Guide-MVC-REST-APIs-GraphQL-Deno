const products = [];
const path = require("path");
const fs = require("fs");

const filePath = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "products__.json"
);

const getFileData = (cb) => {
  fs.readFile(filePath, (err, fileData) => {
    if (err) return cb([]);
    else cb(JSON.parse(fileData));
  });
};

exports.Product = class {
  constructor(productName, productPrice, productDescription, productImage) {
    this.productName = productName;
    this.productPrice = productPrice;
    this.productImage = productImage;
    this.productDescription = productDescription;
  }

  save() {
    getFileData((products) => {
      products.push(this);
      fs.writeFile(filePath, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    getFileData(cb);
  }
};
