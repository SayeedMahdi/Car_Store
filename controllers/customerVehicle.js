const asyncHandler = require("express-async-handler");
const CustomersVehicles = require("../models/vehicleCustomer");
const customer = require("../models/customer");
const vehicle = require("../models/vehicle");

const getSales = asyncHandler(async (req, res) => {
  const data = await CustomersVehicles.getAllSales();
  res.status(200).json(data);
});

//post @api/v1/admin/order
const postCustomerVehicle = asyncHandler(async (req, res) => {
  const customerId = req.body.customerId;
  const vehicleId = req.body.vehicleId;
  const customerExist = await customer.findById("customers", customerId);
  const vehicleExist = await vehicle.findById("vehicles", vehicleId);
  if (customerExist.length === 0 || vehicleExist.length === 0) {
    throw new Error("Customer or Vehicle does not exist!");
  }
  const sale = new CustomersVehicles(req.body);
  await sale.save();
  res.status(200).json("Data inserted");
});

const getUserOrders = asyncHandler(async (req, res) => {
  const customerId = req.params.id;
  const isExist = await customer.findById("customers", customerId);
  if (isExist.length === 0) {
    throw new Error("User not Found!");
  }
  const data = await CustomersVehicles.getCustomerVehicle(customerId);
  res.status(200).json(data);
});

module.exports = {
  postCustomerVehicle,
  getSales,
  getUserOrders,
};
