// get the client
const mysql = require("mysql2");


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

connection.connect((err)=>{
    if(err) console.log(err.message);
    else{
        console.log("connected successful");
    }
});

module.exports = connection;
