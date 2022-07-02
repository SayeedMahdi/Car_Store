const db = require("../../database/database");
const asyncHandler = require("express-async-handler");



//post @api/v1/client/customer
const singUp = asyncHandler( (req, res) => {
  const { name,country,dateOfBirth,age } = req.body;
  const qu = `INSERT INTO  customers (name,country,dateOfBirth,age) VALUES ($1,$2,$3,$4)`;
  const vehicle = [name, country, dateOfBirth, age];
  db.run(qu, vehicle);
  const selectQuery = `SELECT * FROM customers`;
  db.all(selectQuery, (err, data) => {
    if (err) {
      throw new Error(err);
    }
    // Success
    res.status(200).json(data);
  });
});

//update @api/v1/clint/customer
const editUser = asyncHandler((req, res) => {
    const id = req.params.id;
    const queryPortionArr = []
    const queryPortionValues = []
    ["name", "country", "dateOfBirth", "age"].forEach(property => {
        if (property in req.body) {
            queryPortionArr.push(property);
            queryPortionValues.push(req.body[property])
        }
    });
    let queryPortionStr = queryPortionArr.join('=?,');
    queryPortionStr +=`=?`
    const qu = `UPDATE customers SET ${queryPortionStr} WHERE id= ${id}`;
    db.run(qu, queryPortionValues,(err) =>{
        if(err){
            throw new Error(err);
        }
         // Success
      res.status(200).json(id);
    });
  });



module.exports = {
 singUp,
 editUser
};
