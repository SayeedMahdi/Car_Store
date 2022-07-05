const {
  getVehicles,
  getVehicle,
  postVehicle,
  updateVehicle,
  deleteVehicle,
  searchVehicle,
} = require("./controllers/vehicles");
const order = require();
const {
  getCustomers,
  getCustomer,
  searchCustomer,
  createCustomer,
  deleteCustomer,
} = require("./controllers/customer");

const {
  postCustomerVehicle,
  getSales,
} = require("./controllers/customerVehicle");

const router = require("express").Router();

router.route("/vehicle").get(getVehicles);
router.route("/vehicle/:id").get(getVehicle);
// router.route("/vehicle/search/:name").get(searchVehicle);

router.route("/customer").get(getCustomers).post(createCustomer);
router.route("/customer/:id").get(getCustomer).delete(deleteCustomer);
// .put(updateCustomer).delete(deleteCustomer);
router.route("/customer/search/:name").get(searchCustomer);

router.route("/order").get(getSales).post(postCustomerVehicle);
router.route("/order/:id").get(getUserOrders);
module.exports = router;
