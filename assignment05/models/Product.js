const fs = require("fs");
const rootdir = require("../utils/path");
const path = require("path");
const { Cart } = require("./Cart");

const filePath = path.join(rootdir, "data", "products.json");
const getProductData = (cb) => {
  fs.readFile(filePath, (err, fileContent) => {
    if (!err) {
      return cb(JSON.parse(fileContent));
    } else {
      return cb([]);
    }
  });
};

exports.Product = class {
  constructor(id, productName, productPrice, productUrl, productDescription) {
    this.id = id;
    this.productName = productName;
    this.productPrice = productPrice;
    this.productUrl = productUrl;
    this.productDescription = productDescription;
  }

  saveProduct() {
    const randomUID = Math.floor(Date.now() / 1000).toString();
    getProductData((products) => {
      if (this.id) {
        const existingProduct = products.findIndex(
          (prod) => prod.id === this.id
        );
        const updatedProduct = [...products];
        updatedProduct[existingProduct] = {
          id: this.id,
          name: this.productName,
          price: this.productPrice,
          image: this.productUrl,
          description: this.productDescription,
        };
        fs.writeFile(filePath, JSON.stringify(updatedProduct), (err) => {
          if (err) console.log(err);
        });
      } else {
        const newProduct = {
          id: randomUID,
          name: this.productName,
          price: this.productPrice,
          description: this.productDescription,
          image: this.productUrl,
        };
        products.push(newProduct);
        fs.writeFile(filePath, JSON.stringify(products), (err) => {
          if (err) console.log(err);
        });
      }
    });
  }

  static fetchAll(cb) {
    getProductData(cb);
  }

  static getProductById(id, cb) {
    getProductData((products) => {
      const product = products.find((product) => product.id === id);
      cb(product);
    });
  }

  static deleteProductById(id) {
    getProductData((products) => {
      const product = products.find((prod) => prod.id === id);
      const productList = products.filter((prod) => prod.id !== id);
      fs.writeFile(filePath, JSON.stringify(productList), (err) => {
        if (err) console.log(err);
        else {
          Cart.deleteCartData(id, product.price);
        }
      });
    });
  }
};
