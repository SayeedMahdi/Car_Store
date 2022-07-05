const Customer = require("../models/customer.js");
const asyncHandler = require('express-async-handler');

//get all @api/v1/admin/customer
const getCustomers = async (req, res) => {
  const customers = await Customer.getAll();
  res.json(customers);
};


const getCustomer = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const customer = await Customer.findById(id);
  if (customer.length === 0) { 
     res.status(404)
     throw new Error("No such user found!");
        }
  res.status(200).json(customer);
});



const createCustomer =asyncHandler( async (req, res) => {
  const user = new Customer(req.body);
  await user.save();
  const lastUser =await Customer.lastInserted();
  return res.json(lastUser[0]);
});




const searchCustomer = asyncHandler(async(req, res) => {
  const searchValue = req.params.name;
  const customer = await Customer.search(searchValue);
  if (customer.length === 0) { 
     res.status(404)
     throw new Error("No such user found!");
        }
  res.status(200).json(customer);
});



const updateCustomer =asyncHandler( async(req, res) => {
  const id = req.params.id;
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
  const qu = `UPDATE customers SET ${queryPortionStr} WHERE id= ${id}`;
  db.run(qu, queryPortionValues, (err) => {
    if (err) {
      throw new Error(err);
    }
    // Success

  });
});

//delete @api/v1/admin/customer/:id
const deleteCustomer = asyncHandler(async(req, res) => {
  const id = req.params.id;
   await Customer.delete(id);
  res.status(200).json("deleted");
});

module.exports = {
  getCustomer,
  getCustomers,
  createCustomer,
  searchCustomer,
   updateCustomer,
   deleteCustomer
};
