const products = [];
const path = require("path");
const fs = require("fs");
const ShortUniqueId = require("short-unique-id");

const filePath = path.join(__dirname, "..", "data", "products.json");

const getProductsFromFile = (cb) => {
  fs.readFile(filePath, (err, fileContent) => {
    if (err) return cb([]);
    cb(JSON.parse(fileContent));
  });
};

exports.Product = class {
  constructor(productName, productPrice, productImage, productDescription) {
    this.productName = productName;
    this.productPrice = productPrice;
    this.productImage = productImage;
    this.productDescription = productDescription;
  }

  save() {
    this.uid = new ShortUniqueId({ length: 10 }).rnd().toString();
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

  static findById(id, cb) {
    getProductsFromFile((products) => {
      const product = products.find((p) => p.uid === id);
      cb(product);
    });
  }
};
