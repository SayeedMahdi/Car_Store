const db = require("../../database/database");
const asyncHandler = require("express-async-handler");

const getVehicles =asyncHandler( async (req,res) =>{
    const query = `SELECT * FROM vehicles`;
    const data = await db.query(query,[]);
   res.send(data);
} );

const postVehicle =asyncHandler( async (req,res) =>{
    const {name,manufacturer,model, mileage,price,count} = req.body;
    const qu = `INSERT INTO  vehicles (name,manufacturer,model,mileage,price,count) VALUES ($1,$2,$3,$4,$5,$6)`;
    const vehicle =[name,manufacturer,model,mileage,price,count];
     db.run(qu,vehicle);
     const selectQuery = `SELECT * FROM vehicles`;
     db.all(selectQuery , (err , data) => {
        if(err) {
            throw new Error(err);
        };

        // Success
     
        res.status(200).json(data);
    });
} );
module.exports ={
    getVehicles,
    postVehicle
}