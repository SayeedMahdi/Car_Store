const db = require('./database.js')


//Create table Customers
db.run(`
CREATE TABLE customers (
    id int primary key NOT NULL, 
    name varchar(100), 
    country varchar(100),
    dateOfBirth date,
    age int 
);`
);

//Create table Vehicles
db.run(`
CREATE TABLE vehicles (
    id int primary key NOT NULL ,
    name varchar(100), manufacturer varchar(100),
    model varchar(100),
    milage int  ,
    price int 
);`
);

//Create table Sales
db.run(`
CREATE TABLE customer_vehicles (
    customerId int, 
    vehicleId int,
    FOREIGN KEY (customerId) REFERENCES customers(id),
    FOREIGN KEY (vehicleId) REFERENCES vehicles(id)
);`
);
