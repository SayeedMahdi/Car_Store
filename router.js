const { getVehicles, getVehicle, postVehicle, updateVehicle, deleteVehicle, searchVehicle} = require("./controllers/vehicles");
const { getCustomers , getCustomer, searchCustomer, postCustomer, updateCustomer, deleteCustomer } = require("./controllers/customer");
const  {postCustomerVehicle}= require("./controllers/customerVehicle");


const router = require("express").Router();

router.route("/vehicle").get(getVehicles).post(postVehicle);
router.route("/vehicle/:id").get(getVehicle).put(updateVehicle).delete(deleteVehicle);
router.route("/vehicle/search/:name").get(searchVehicle);

router.route("/customer").get(getCustomers).post(postCustomer);
router.route("/customer/:id").get(getCustomer).put(updateCustomer).delete(deleteCustomer);
router.route("/customer/search/:name").get(searchCustomer);

// router.route("/sales").post(postCustomerVehicle);
module.exports = router;
