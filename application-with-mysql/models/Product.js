// DB details can be found by loggin into https://www.clever-cloud.com/
// with b*******.s11@****.**
// const db = require("../utils/database");

// exports.Product = class {
//   constructor(productName, productPrice, productUrl, productDescription) {
//     this.id = Math.floor(Date.now() / 1000).toString();
//     this.productName = productName;
//     this.productPrice = productPrice;
//     this.productUrl = productUrl;
//     this.productDescription = productDescription;
//   }

//   saveProduct() {
//     return db.execute(
//       "INSERT INTO products (id,name,price,image, description) VALUES (?,?,?,?,?)",
//       [
//         this.id,
//         this.productName,
//         this.productPrice,
//         this.productUrl,
//         this.productDescription,
//       ]
//     );
//   }

//   static fetchAll() {
//     return db.execute("SELECT * FROM products");
//   }

//   static getProductById(id) {
//     return db.execute("SELECT * FROM products WHERE products.id = ?", [id]);
//   }

//   static deleteProductById(id) {
//     return db.execute("DELETE FROM products where products.id = ?", [id]);
//   }

//   static updateProductById({
//     productId,
//     productName,
//     productPrice,
//     productImage,
//     productDescription,
//   }) {
//     return db.execute(
//       "UPDATE products set name=?, price=?, image=?, description=? where products.id = ?",
//       [productName, productPrice, productImage, productDescription, productId]
//     );
//   }
// };

const Sequelize = require("sequelize");

const sequelize = require("../utils/database");

const Product = sequelize.define("product", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: Sequelize.STRING,
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },

  image: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});

module.exports = Product;
