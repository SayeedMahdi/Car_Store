const db = require("./database");
const query ="DELETE FROM vehicles WHERE id=6";
db.run(query,(err) =>{
    console.log(err);
});