// get the client
const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createPool({
    host     : '192.168.157.203',
    user     : 'mahdi',
    database : 'mahdi',
    password : 'mahdi',
    port     : '3306',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = connection;
