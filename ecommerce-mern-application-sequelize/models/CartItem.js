const Sequelize = require("sequelize");
const sequelize = require("../utils/db");

const CartItem = sequelize.define("cartItem", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  quantity: {
    type: Sequelize.INTEGER,
  },
});

module.exports = CartItem;
