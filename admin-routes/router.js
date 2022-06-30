const {
  getVehicles,
  getVehicle,
  postVehicle,
  updateVehicle,
  deleteVehicle,
  searchVehicle
} = require("../controllers/admin/vehicles");

const router = require("express").Router();
router.route("/vehicle").get(getVehicles).post(postVehicle);
router.route("/vehicle/:id").get(getVehicle).put(updateVehicle).delete(deleteVehicle);
router.route("/vehicle/search/:name").get(searchVehicle);
module.exports = router;
