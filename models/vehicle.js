const db = require("../database/database");
const customFuntions = require("./customFunction");
class Vehicles extends customFuntions{
  constructor(options) {
    if (typeof options === "object") {
      super();
      (this.name = options.name),
        (this.manufacturer = options.manufacturer),
        (this.model = options.model),
        (this.mileage =parseInt( options.mileage)),
        (this.price = parseInt(options.price)),
        (this.count = parseInt(options.count)),
        (this.imagePaths = options.imagePaths);
    }
  }


  async save() {
    const qu = `INSERT INTO  vehicles ( name, manufacturer, model, mileage, price, count, image ) VALUES (?,?,?,?,?,?,?)`;
    const vehicle = [
      this.name,
      this.manufacturer,
      this.model,
      this.mileage,
      this.price,
      this.count,
      `${[this.imagePaths]}`
    ];
    new Promise((resolve, reject) => {
      db.query(qu, vehicle, (err) => {
        if (err) {
          reject(err);
        }
      });
    });
  }
}

module.exports = Vehicles;
