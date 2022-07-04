const db = require('./database.js')


//Create table Customers
db.run(`
CREATE TABLE customers (
    id INTEGER PRIMARY KEY  AUTOINCREMENT, 
    name varchar(100) , 
    country varchar(100),
    dateOfBirth date,
    age int unsigned
);`
);

//Create table Vehicles
db.run(`
CREATE TABLE vehicles (
    id INTEGER PRIMARY KEY  AUTOINCREMENT,
    name varchar(100), manufacturer varchar(100),
    model varchar(100),
    mileage int  ,
    price int ,
    count  int unsigned
);`
);

//Create table Sales
db.run(`
CREATE TABLE customer_vehicles (
    customerId int, 
    vehicleId int,
    count int NOT NULL UNSIGNED,
    buyDate TIMESTAMP   DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customerId) REFERENCES customers(id),
    FOREIGN KEY (vehicleId) REFERENCES vehicles(id)

);`
);
