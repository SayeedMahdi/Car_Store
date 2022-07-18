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
  getUserOrders,
} = require("./controllers/customerVehicle");
const upload = require("./middleware/bufferStorage"); 
const resize = require("./middleware/resize");
const { signUp, signIn } = require("./controllers/adminController");
const auth = require("./middleware/auth");

const router = require("express").Router();

router.route("/signup").all(auth).post(signUp);
router.route("/signIn").post(signIn);

router.route("/vehicle").get(getVehicles).post(upload.single("file"),resize, createVehicle);
router
  .route("/vehicle/:id")
  .all(auth)
  .get(getVehicle)
  .put(updateVehicle)
  .delete(deleteVehicle);
router.route("/vehicle/search/:name").all(auth).get(searchVehicle);

router.route("/customer").all(auth).get(getCustomers).post(createCustomer);

router
  .route("/customer/:id")
  .all(auth)
  .get(getCustomer)
  .delete(deleteCustomer)
  .put(updateCustomer);
router.route("/customer/search/:name").all(auth).get(searchCustomer);

router.route("/order").all(auth).get(getSales).post(postCustomerVehicle);
router.route("/order/:id").all(auth).get(getUserOrders);
module.exports = router;
