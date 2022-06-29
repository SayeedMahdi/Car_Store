const{getVehicles, postVehicle} =require("./controllers/admin/vehicles");

const router= require("express").Router();
router.route("/admin/vehicle").get(getVehicles).post(postVehicle);



module.exports = router;
