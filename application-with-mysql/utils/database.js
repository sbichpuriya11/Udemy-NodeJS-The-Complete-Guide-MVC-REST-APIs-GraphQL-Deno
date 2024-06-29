const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  "bb9bwvylzpwjeab8fyoh",
  "uubqu7zpsci8nqwa",
  "jqqLm7IbhYwnuWhg1YNk",
  {
    dialect: "mysql",
    host: "bb9bwvylzpwjeab8fyoh-mysql.services.clever-cloud.com",
  }
);

module.exports = sequelize;
