// get the client
const mysql = require("mysql2");

// create the connection to database

const connection = mysql.createConnection({
    host: "192.168.157.100",
    user: "mahdi",
    database: "mahdi",
    password: "mahdi",
    port: "3306",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  
});
module.exports = connection;
