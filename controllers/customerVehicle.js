const db = require("../database/database");
const asyncHandler = require("express-async-handler");
const customerVehicle = require("../models/customer_verhicles");
const Customer = require("../models/customer");
//get all vehicleAndCustomers @api/v1/admin/order
const getSales = asyncHandler((req, res) => {
  const selectQuery = `SELECT customers.name AS CustomerName, customers.country ,
      vehicles.name As vehicleName ,vehicles.price * Customer_vehicles.count As Total_Price,
      customer_vehicles.count,customer_vehicles.buyDate FROM customers  
     INNER JOIN customer_vehicles ON customers.id = customer_vehicles.customerId   
     INNER JOIN vehicles ON vehicles.id = customer_vehicles.vehicleId ORDER BY CustomerName;`;
  db.all(selectQuery, (err, data) => {
    if (err) {
      throw new Error(err);
    }
    // Success
    res.status(200).json(data);
  });
});

//post @api/v1/admin/order
const postCustomerVehicle = asyncHandler(async (req, res) => {
  const { customerId, vehicleId, countOrder } = req.body;

  const qu = `INSERT INTO  customer_vehicles ( customerId, vehicleId, count) VALUES ($1,$2,$3)`;
  const vehicle = [+customerId, vehicleId, +countOrder];
  db.run(qu, vehicle);
  const query2 = `UPDATE vehicles SET count =count - ?  WHERE id= ${vehicleId}`;
  db.run(query2, countOrder, (err) => {
    if (err) {
      throw new Error(err);
    }
  });
  res.status(200).json("Data inserted");
});
const getUserOrders = asyncHandler(async (req, res) => {
  const customerId = req.params.id;
  const data = await Customer.findById(customerId);
  if (data.length === 0) {
    throw new Error("User not Found!");
  }
  customerVehicle.getCustomerVehicle(customerId);
});

module.exports = {
  postCustomerVehicle,
  getSales,
  getUserOrders,
};
