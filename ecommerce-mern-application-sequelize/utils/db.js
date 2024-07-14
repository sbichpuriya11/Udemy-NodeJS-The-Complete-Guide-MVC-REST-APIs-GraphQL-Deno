const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  "b3gzusvrkvqlg1c2tkwd",
  "usuw2l1u6agbocvc",
  "cBJoisuCLv9TMOiLUxzA",
  {
    dialect: "mysql",
    host: "b3gzusvrkvqlg1c2tkwd-mysql.services.clever-cloud.com",
  },
);

module.exports = sequelize;
