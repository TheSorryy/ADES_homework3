const mysql = require("mysql");

const DB_HOST = 'localhost';
const DB_PORT = '3306';
const DB_USER = 'root';
const DB_PASSWORD = 'P@ssw0rd1234$$';
const DB_NAME = 'sp_game_db';
console.log(DB_HOST);
console.log(DB_PORT);
const connection = mysql.createConnection({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    // retain DATE as a string
    dateStrings: true
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
});

module.exports = connection;