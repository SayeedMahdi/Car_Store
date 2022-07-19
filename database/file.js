const db = require("./database");
const query ="describe vehicles";
db.query(query,(err,result) =>{
    console.log(result);
});