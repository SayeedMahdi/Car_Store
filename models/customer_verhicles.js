const db = require("../database/database");

class customerVehicle {
  static async getCustomerVehicle(customerId) {
    const selectQuery = `SELECT customers.name AS CustomerName, customers.country ,
      vehicles.name As vehicleName ,vehicles.price * Customer_vehicles.count As Total_Price,
      customer_vehicles.count,customer_vehicles.buyDate FROM customers  
     INNER JOIN customer_vehicles ON customers.id = customer_vehicles.customerId   
     INNER JOIN vehicles ON vehicles.id = customer_vehicles.vehicleId  WHERE customer.id = ?`;
    return new Promise((resolve, reject) => {
      db.all(selectQuery, customerId, (err, data) => {
        reject(err);
        resolve(data);
      });
    });
  }
}
module.exports = customerVehicle;
