
const router= require("express").Router();
router.route("/admin/vehicle").getVehicle().postVehicle();



module.exports = router;
