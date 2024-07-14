const Sequelize = require("sequelize");
const sequelize = require("../utils/db");
const Order = sequelize.define("order", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
});

module.exports = Order;
