const db = require("../database/database");
class Vehicles {
  constructor(options) {
    if (typeof options === "object") {
      (this.name = options.name),
        (this.manufacturer = options.manufacturer),
        (this.model = options.model),
        (this.mileage = options.mileage),
        (this.price = options.price),
        (this.count = options.count)
    }
  }

  static async findById(id) {
    const querySelector = `SELECT * FROM vehicles WHERE id=? limit 1`;
    return new Promise((resolve, reject) => {
      db.all(querySelector, id, (err, data) => {
        if (data.length > 0) {
          return resolve(data[0]);
        }
        return resolve([]);
      });
    });
  }

  static async getAll() {
    return new Promise((resolve, reject) => {
      db.all("SELECT * FROM vehicles", (err, data) => {
        if (err) {
          throw new Error(err);
        }
        resolve(data);
      });
    });
  }

  async save() {
    const qu = `INSERT INTO  vehicles ( name, manufacturer, model, mileage, price, count ) VALUES ($1,$2,$3,$4,$5,$6)`;
    const vehicle = [
      this.name,
      this.manufacturer,
      this.model,
      this.mileage,
      this.price,
      this.count
    ];
    new Promise((resolve, reject) => {
      db.run(qu, vehicle, (err) => {
        if (err) {
          reject(Error(err));
        }
      });
    });
  }

  static async update(id, queryPortionStr, queryPortionValues) {
    const qu = `UPDATE vehicles SET ${queryPortionStr} WHERE id= ${id}`;
    new Promise((resolve, reject) => {
      db.run(qu, queryPortionValues, (err) => {
        if (err) {
          reject(Error(err));
        }
      });
    });
  }

  static async delete(id) {
    const querySelector = `DELETE FROM vehicles WHERE id=?`;
    db.run(querySelector, id);
  }

  static async search(searchValue) {
    const selectQuery = `SELECT * FROM vehicles WHERE name OR manufacturer OR model OR mileage OR price OR count
     LIKE '%${searchValue}%'`;
    return new Promise((resolve, reject) => {
      db.all(selectQuery, (err, data) => {
        if (err) {
          throw new Error(err);
        }
        resolve(data);
      });
    });
  }

  static async lastInserted() {
    const selectQuery = `SELECT * FROM vehicles ORDER BY ID DESC LIMIT 1`;
    return new Promise((resolve, reject) => {
      db.all(selectQuery, (err, data) => {
        if (err) {
          throw new Error(err);
        }
        resolve(data);
      });
    });
  }
}

module.exports = Vehicles;
