const {
  getVehicles,
  getVehicle,
  updateVehicle,
  deleteVehicle,
  searchVehicle,
  createVehicle,
} = require("./controllers/vehicles");

const {
  getCustomers,
  getCustomer,
  searchCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} = require("./controllers/customer");

const {
  postCustomerVehicle,
  getSales,
} = require("./controllers/customerVehicle");

const router = require("express").Router();

router.route("/vehicle").get(getVehicles).post(createVehicle);
router.route("/vehicle/:id").get(getVehicle).put(updateVehicle).delete(deleteVehicle);
router.route("/vehicle/search/:name").get(searchVehicle);

router.route("/customer").get(getCustomers).post(createCustomer);
router.route("/customer/:id").get(getCustomer).delete(deleteCustomer).put(updateCustomer);
router.route("/customer/search/:name").get(searchCustomer);

router.route("/order").get(getSales).post(postCustomerVehicle);
module.exports = router;
