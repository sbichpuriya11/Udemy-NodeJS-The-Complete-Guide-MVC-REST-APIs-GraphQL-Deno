const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "bb9bwvylzpwjeab8fyoh-mysql.services.clever-cloud.com",
  user: "uubqu7zpsci8nqwa",
  password: "jqqLm7IbhYwnuWhg1YNk",
  database: "bb9bwvylzpwjeab8fyoh",
});

module.exports = pool.promise();
