const Sequelize = require("sequelize");
const sequelize = require("../utils/db");
const OrderItem = sequelize.define("orderItem", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  
});

module.exports = OrderItem;
