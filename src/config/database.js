const mysql = require("mysql2");

const connection = mysql.createConnection({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "Backend_2023",
  database: "capstone_dicoding",
});

module.exports = connection.promise;
