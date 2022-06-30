const {
  getVehicles,
  getVehicle,
  searchVehicle
} = require("../controllers/client/vehicles");

const router = require("express").Router();
router.route("/vehicle").get(getVehicles);
router.route("/vehicle/:id").get(getVehicle);
router.route("/vehicle/search/:name").get(searchVehicle);
module.exports = router;
