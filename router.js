const { getVehicles, getVehicle, postVehicle, updateVehicle, deleteVehicle, searchVehicle} = require("./controllers/vehicles");
const { getCustomers , getCustomer } = require("./controllers/customer");
const  {postCustomerVehicle, getSales}= require("./controllers/customerVehicle");


const router = require("express").Router();

router.route("/vehicle").get(getVehicles);
router.route("/vehicle/:id").get(getVehicle);
// router.route("/vehicle/search/:name").get(searchVehicle);

// router.route("/customer").get(getCustomers).post(postCustomer);
router.route("/customer/:id").get(getCustomer);
// .put(updateCustomer).delete(deleteCustomer);
// router.route("/customer/search/:name").get(searchCustomer);

 router.route("/order").get(getSales).post(postCustomerVehicle);
module.exports = router;
