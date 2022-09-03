const Vehicles = require("../models/vehicle");
const asyncHandler = require("express-async-handler");

//get all @api/v1/admin/customer
const getVehicles = async (req, res) => {
  const vehicles = await Vehicles.getAll("vehicles");
  res.json(vehicles);
};

const getVehicle = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const vehicle = await Vehicles.findById("vehicles", id);
  if (vehicle.length === 0) {
    res.status(404);
    throw new Error("No such vehicle found!");
  }
  res.status(200).json(vehicle);
});

const createVehicle = asyncHandler(async (req, res) => {
  const user = new Vehicles(req.body);
  await user.save();
  const lastUser = await Vehicles.lastInserted("vehicles");
  return res.json(lastUser[0]);
});

const searchVehicle = asyncHandler(async (req, res) => {
  const searchValue = req.params.name;
  const Vehicle = await Vehicles.search("vehicles", searchValue);
  if (Vehicle.length === 0) {
    res.status(404);
    throw new Error("No such user found!");
  }
  res.status(200).json(Vehicle);
});

const updateVehicle = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const result = await Vehicles.findById("vehicles", id);
  if (result.length === 0) {
    throw new Error("there is not Vehicle with ID!");
  }
  const queryPortionArr = [];
  const queryPortionValues = [];
  ["name", "manufacturer", "model", "price", "count", "mileage"].forEach(
    (property) => {
      if (property in req.body) {
        queryPortionArr.push(property);
        queryPortionValues.push(req.body[property]);
      }
    }
  );

  let queryPortionStr = queryPortionArr.join("=?,");
  queryPortionStr += `=?`;
  await Vehicles.update("vehicles", id, queryPortionStr, queryPortionValues);
  const afterUpdate = await Vehicles.findById("vehicles", id);
  res.status(200).json(afterUpdate);
});

//delete @api/v1/admin/Vehicle/:id
const deleteVehicle = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const result = await Vehicles.findById("vehicles", id);
  if (result.length === 0) {
    throw new Error("there is not Vehicle with ID!");
  }
  await Vehicles.delete("vehicles", id);
  res.status(200).json("deleted");
});

module.exports = {
  getVehicle,
  getVehicles,
  createVehicle,
  searchVehicle,
  updateVehicle,
  deleteVehicle,
};
