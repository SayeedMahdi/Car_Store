const db = require("../database/database")
class CustomersVehicle {
  constructor(options) {
    if (typeof options === "object") {
      (this.customerId = options.customerId),
        (this.vehicleId = options.vehicleId),
        (this.countOrder = options.countOrder);
    }
  }

  async save() {
    const qu = `INSERT INTO  customer_vehicles ( customerId, vehicleId, count) VALUES ($1,$2,$3)`;
    const vehicle = [+this.customerId, this.vehicleId, +this.countOrder];
    new Promise((resolve, reject) => {
      db.run(qu, vehicle, (err) => {
        if (err) {
          reject(Error(err));
        }
      });
      const query2 = `UPDATE vehicles SET count =count - ?  WHERE id= ${this.vehicleId}`;
      db.run(query2, this.countOrder, (err) => {
        if (err) {
          throw new Error(err);
        }
      });
    });
  }

  static async getAllSales() {
    const selectQuery = `SELECT customers.name AS CustomerName, customers.country ,
    vehicles.name As vehicleName ,vehicles.price * Customer_vehicles.count As Total_Price,
    customer_vehicles.count,customer_vehicles.buyDate FROM customers  
   INNER JOIN customer_vehicles ON customers.id = customer_vehicles.customerId   
   INNER JOIN vehicles ON vehicles.id = customer_vehicles.vehicleId ORDER BY CustomerName;`;
   return new Promise((resolve, reject) => {
    db.all(selectQuery, (err, data) => {
      if (err) {
        reject(err)
      }
      resolve(data);
    });
  });
  }

  static async lastInserted() {
    const selectQuery = `SELECT * FROM customer_vehicles ORDER BY customerId DESC LIMIT 1`;
    return new Promise((resolve, reject) => {
      db.all(selectQuery, (err, data) => {
        if (err) {
          throw new Error(err);
        }
        resolve(data);
      });
    });
  }

  static async getCustomerVehicle(customerId) {
    const selectQuery = `SELECT customers.name AS CustomerName, customers.country ,
      vehicles.name As vehicleName ,vehicles.price * Customer_vehicles.count As Total_Price,
      customer_vehicles.count,customer_vehicles.buyDate FROM customers  
     INNER JOIN customer_vehicles ON customers.id = customer_vehicles.customerId   
     INNER JOIN vehicles ON vehicles.id = customer_vehicles.vehicleId  WHERE customers.id = ?`;
    return new Promise((resolve, reject) => {
      db.all(selectQuery, customerId, (err, data) => {
        
        return resolve(data);
      });
    });
  }
}
 



module.exports = CustomersVehicle;