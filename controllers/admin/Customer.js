const db = require("../../database/database");
const asyncHandler = require("express-async-handler");


//get all @api/v1/admin/vehicle
const getCustomers = asyncHandler( (req, res) => {
    const selectQuery = `SELECT * FROM customers`;
    db.all(selectQuery, (err, data) => {
      if (err) {
        throw new Error(err);
      }
      // Success
      res.status(200).json(data);
    });
  });

   //delete @api/v1/admin/vehicle
 const getCustomer = asyncHandler( (req, res) => {
    const id = req.params.id;
    const querySelector = `SELECT * FROM customers WHERE id=?`;
    db.all(querySelector, id,(err,data) =>{
        if(err){
            res.status(404)
            throw new Error(err);
        }
        else if(data.length<=0){
            res.status(404).json("There is not any Customer with that Id 😥");
            
        }else{
            // Success
         res.status(200).json(data);
        }
    });
  });

  
 //delete @api/v1/admin/vehicle
 const searchCustomer = asyncHandler( (req, res) => {
    const searchQuery = req.params.searchQuery;
    const querySelector = `SELECT * FROM vehicles WHERE name OR manufacturer OR model OR PRICE LIKE '%${searchQuery}%'`;
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
  


    //delete @api/v1/admin/vehicle
    const deleteCustomer = asyncHandler((req, res) => {
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
    