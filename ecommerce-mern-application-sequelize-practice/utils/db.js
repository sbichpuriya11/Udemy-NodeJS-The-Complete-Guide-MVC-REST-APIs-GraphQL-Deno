const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  "btrnbti42kwexlhyuyth",
  "uhij2xkwrgk3qltf",
  "OGAnoaHAM5nMPFZF322Z",
  {
    dialect: "mysql",
    host: "btrnbti42kwexlhyuyth-mysql.services.clever-cloud.com",
  },
);

module.exports = sequelize;
