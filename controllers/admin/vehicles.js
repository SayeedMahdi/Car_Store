const db = require("../../database/database");
const asyncHandler = require("express-async-handler");



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
  
//post @api/v1/admin/vehicle
const postVehicle = asyncHandler( (req, res) => {
  const { name, manufacturer, model, mileage, price, count } = req.body;
  const qu = `INSERT INTO  vehicles (name,manufacturer,model,mileage,price,count) VALUES ($1,$2,$3,$4,$5,$6)`;
  const vehicle = [name, manufacturer, model, mileage, price, count];
  db.run(qu, vehicle);
  const selectQuery = `SELECT * FROM vehicles`;
  db.all(selectQuery, (err, data) => {
    if (err) {
      throw new Error(err);
    }
    // Success
    res.status(200).json(data);
  });
});

//update @api/v1/admin/vehicle
const updateVehicle = asyncHandler((req, res) => {
    const id = req.params.id;
    const queryPortionArr = []
    const queryPortionValues = []
    ["name", "manufacturer", "model", "mileage", "price", "count"].forEach(property => {
        if (property in req.body) {
            queryPortionArr.push(property);
            queryPortionValues.push(req.body[property])
        }
    });
    let queryPortionStr = queryPortionArr.join('=?,');
    queryPortionStr +=`=?`
    const qu = `UPDATE vehicles SET ${queryPortionStr} WHERE id= ${id}`;
    db.run(qu, queryPortionValues,(err) =>{
        if(err){
            throw new Error(err);
        }
         // Success
      res.status(200).json(id);
    });
  });

  //delete @api/v1/admin/vehicle
const deleteVehicle = asyncHandler((req, res) => {
    const id = req.params.id;
    const querySelector = `DELETE FROM vehicles WHERE id=?`;
    db.run(querySelector, id,(err) =>{
        if(err){
            res.status(404)
            throw new Error(err);
        }
         // Success
      res.status(200).json(id);
    });
  });


module.exports = {
  getVehicles,
  getVehicle,
  searchVehicle,
  postVehicle,
  updateVehicle,
  deleteVehicle
};
