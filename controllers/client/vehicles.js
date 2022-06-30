const asyncHandler = require("express-async-handler");
const db = require("../../database/database");
//get all @api/v1/admin/vehicle
const getVehicles = asyncHandler( (req, res) => {
    const selectQuery = `SELECT * FROM vehicles`;
    db.all(selectQuery, (err, data) => {
      if (err) {
        throw new Error(err);
      }
      // Success
      res.status(200).json(data);
    });
  });

//delete @api/v1/admin/vehicle
const getVehicle = asyncHandler( (req, res) => {
    const id = req.params.id;
    const querySelector = `SELECT * FROM vehicles WHERE id=?`;
    db.all(querySelector, id,(err,data) =>{
        if(err){
            res.status(404)
            throw new Error(err);
        }
        else if(data.length<=0){
            res.status(404).json("There is not any vehicle with that Id 😥");
            
        }else{
            // Success
         res.status(200).json(data);
        }
    });
  });

   //delete @api/v1/admin/vehicle
 const searchVehicle = asyncHandler( (req, res) => {
    const name = req.params.name;
    const querySelector = `SELECT * FROM vehicles WHERE name LIKE '%${name}%'`;
    db.all(querySelector ,(err,data) =>{
        if(err){
            res.status(404)
            throw new Error(err);
        }
        else if(data.length<=0){
            res.status(404).json("There is not any vehicle with that name 😥");
            
        }else{
            // Success
         res.status(200).json(data);
        }
    });
  });
  

  module.exports ={
    getVehicle,
    getVehicles,
    searchVehicle
  }