const mysql = require("mysql");
require("dotenv").config();

// Prepare to connect to MySQL with your secret environment variables
const dbBase = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  database: process.env.MYSQL_DB,
  connectionLimit:5
});

module.exports = dbBase;