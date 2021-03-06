const Customer = require("../models/customer.js");
const asyncHandler = require("express-async-handler");

//get all @api/v1/admin/customer
const getCustomers = async (req, res) => {
  const customers = await Customer.getAll("customers");
  res.json(customers);
};

const getCustomer = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const customer = await Customer.findById("customers", id);
  if (customer.length === 0) {
    res.status(404);
    throw new Error("No such user found!");
  }
  res.status(200).json(customer);
});

const createCustomer = asyncHandler(async (req, res) => {
  const user = new Customer(req.body);
  const err = await user.save();
  if (err) {
    throw new Error(err);
  }
  const lastUser = await Customer.lastInserted("customers");
  return res.json(lastUser[0]);
});

const searchCustomer = asyncHandler(async (req, res) => {
  const searchValue = req.params.name;
  const customer = await Customer.search("customers", searchValue);
  if (customer.length === 0) {
    res.status(404);
    throw new Error("No such customer found!");
  }
  res.status(200).json(customer);
});

const updateCustomer = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const result = await Customer.findById("customers", id);

  if (result.length === 0) {
    throw new Error("there is not customer with ID!");
  }
  const queryPortionArr = [];
  const queryPortionValues = [];
  ["name", "country", "age", "dateOfBirth"].forEach((property) => {
    if (property in req.body) {
      queryPortionArr.push(property);
      queryPortionValues.push(req.body[property]);
    }
  });

  let queryPortionStr = queryPortionArr.join("=?,");
  queryPortionStr += `=?`;
  const flag = await Customer.update(
    "customers",
    id,
    queryPortionStr,
    queryPortionValues
  );
  console.log(flag);
  if (flag) {
    const afterUpdate = await Customer.findById("customers", id);
    res.status(200).json(afterUpdate);
  }
});

//delete @api/v1/admin/customer/:id
const deleteCustomer = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const isExist = await Customer.findById("customers", id);
  if (isExist.length === 0) {
    throw new Error("There is not Customer with that Id");
  }
  await Customer.delete("customers", id);
  res.status(200).json("deleted");
});

module.exports = {
  getCustomer,
  getCustomers,
  createCustomer,
  searchCustomer,
  updateCustomer,
  deleteCustomer,
};
