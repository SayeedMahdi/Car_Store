const db = require("../database/database");
const asyncHandler = require("express-async-handler");


//get all vehicleAndCustomers @api/v1/admin/sales
const getSales = asyncHandler( (req, res) => {
    const selectQuery = `SELECT * FROM customers`;
    db.all(selectQuery, (err, data) => {
      if (err) {
        throw new Error(err);
      }
      // Success
      res.status(200).json(data);
    });
  });

   //get A customer @api/v1/admin/customer
 const getCustomer = asyncHandler( (req, res) => {
    const id = req.params.id;
   getCustomersWithId(res,id);
  });

  
 //search Customers @api/v1/admin/vehicle
 const searchCustomer = asyncHandler( (req, res) => {
    const searchQuery = req.params.searchQuery;
    const querySelector = `SELECT * FROM customers WHERE name OR age OR dateOfBirth OR country LIKE '%${searchQuery}%'`;
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
  
//post @api/v1/admin/sales
const postCustomerVehicle = asyncHandler(async(req, res) => {
  const { customerId, vehicleId } = req.body;
  const result =await getCustomersWithId(res,"customers",customerId);
  console.log(result);
//   const qu = `INSERT INTO  customers ( name, country, age, dateOfBirth ) VALUES ($1,$2,$3,$4)`;
//   const vehicle = [ name, country, age, dateOfBirth ];
//   db.run(qu, vehicle);
//   const selectQuery = `SELECT * FROM customers ORDER BY ID DESC LIMIT 1`;
//   db.all(selectQuery, (err, data) => {
//     if (err) {
//       throw new Error(err);
//     }
//     // Success
//     res.status(200).json(data[0]);
//   });
});


//update @api/v1/admin/customer/:id
const updateCustomer = asyncHandler((req, res) => {
  const id = req.params.id;
  const queryPortionArr = [];
  const queryPortionValues = [];
  ["name", "country", "age", "dateOfBirth"].forEach(
    (property) => {
      if (property in req.body) {
        queryPortionArr.push(property);
        queryPortionValues.push(req.body[property]);
      }
    }
  );
  let queryPortionStr = queryPortionArr.join("=?,");
  queryPortionStr += `=?`;
  const qu = `UPDATE customers SET ${queryPortionStr} WHERE id= ${id}`;
  db.run(qu, queryPortionValues, (err) => {
    if (err) { 
      throw new Error(err);
    }
    // Success
    
    getCustomersWithId(res,id);
  });
});

    //delete @api/v1/admin/customer/:id
    const deleteCustomer = asyncHandler((req, res) => {
      const id = req.params.id;
      const querySelector = `DELETE FROM customers WHERE id=?`;
      db.run(querySelector, id,(err) =>{
          if(err){
              res.status(404)
              throw new Error(err);
          }
           // Success
        res.status(200).json("successfully deleted"+id);
      });
    });


module.exports={
 postCustomerVehicle
}

//get customer with id
const getCustomersWithId =(res, table, id) => {
  const querySelector = `SELECT * FROM ${table} WHERE id=?`;
  var result;
  db.all(querySelector,id, (err, data) => {
    if (err) {
      res.status(404);
      throw new Error(err);
    } else if (data.length <= 0) {
      res.status(404).json("There is not any vehicle with that id 😥");
    } else {
      // Success
      result = data;
    }
    console.log(result);
    return result;
})
}
