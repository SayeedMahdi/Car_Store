const db = require("../database/database");
const customFuntions = require("./customFunction");
class Vehicles extends customFuntions{
  constructor(options) {
    if (typeof options === "object") {
      super();
      (this.name = options.name),
        (this.manufacturer = options.manufacturer),
        (this.model = options.model),
        (this.mileage = options.mileage),
        (this.price = options.price),
        (this.count = options.count);
    }
  }


  async save() {
    const qu = `INSERT INTO  vehicles ( name, manufacturer, model, mileage, price, count ) VALUES (?,?,?,?,?,?)`;
    const vehicle = [
      this.name,
      this.manufacturer,
      this.model,
      this.mileage,
      this.price,
      this.count,
    ];
    new Promise((resolve, reject) => {
      db.query(qu, vehicle, (err) => {
        if (err) {
          reject(Error(err));
        }
      });
    });
  }
}

module.exports = Vehicles;
