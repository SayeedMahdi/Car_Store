const db = require("../../database/database");
const asyncHandler = require("express-async-handler");

const getVehicles =asyncHandler( async (req,res) =>{
    const query = `SELECT * FROM vehicles`;
    const data = await db.query(query,[]);
   res.send(data);
} );

const postVehicles =asyncHandler( async (req,res) =>{
    const {id,name,man}
    const query = `SELECT * FROM vehicles`;
    const data = await db.query(query,[]);
   res.send(data);
} )