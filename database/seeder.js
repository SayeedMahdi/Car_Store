const db = require("./database.js");

//Create table Customers
db.query(`
CREATE TABLE customers (
    id INTEGER PRIMARY KEY  AUTO_INCREMENT, 
    name varchar(100) , 
    country varchar(100),
    dateOfBirth date,
    age int ,
    phone varchar(14)
);`);

//Create table Vehicles
db.query(`
CREATE TABLE vehicles (
    id INTEGER PRIMARY KEY  AUTO_INCREMENT,
    name varchar(100), manufacturer varchar(100),
    model varchar(100),
    mileage int  ,
    price int ,
    count  int 
);`);

//Create table Sales
db.query(`
CREATE TABLE customer_vehicles (
    customerId int, 
    vehicleId int,
    count int NOT NULL ,
    buyDate TIMESTAMP   DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customerId) REFERENCES customers(id),
    FOREIGN KEY (vehicleId) REFERENCES vehicles(id)

);`);
