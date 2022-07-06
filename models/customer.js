const db = require("../database/database");

class Customer {
  constructor(options) {
    if (typeof options === "object") {
      (this.name = options.name),
        (this.age = options.age),
        (this.country = options.country),
        (this.dateOfBirth = options.dateOfBirth),
        (this.phone = options.phone);
    }
  }

  static async findById(id) {
    const querySelector = `SELECT * FROM customers WHERE id=? limit 1`;
    return new Promise((resolve, reject) => {
      db.query(querySelector, id, (err, data) => {
        if (data.length > 0) {
          return resolve(data[0]);
        }
        return resolve([]);
      });
    });
  }

  static async getAll() {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM customers", (err, data) => {
        if (err) {
          throw new Error(err);
        }
        resolve(data);
      });
    });
  }

  async save() {
    const qu = `INSERT INTO  customers ( name, country, age, dateOfBirth, phone ) VALUES (?,?,?,?,?)`;
    const customer = [
      this.name,
      this.country,
      this.age,
      this.dateOfBirth,
      this.phone,
    ];
    new Promise((resolve, reject) => {
      db.query(qu, customer, (err) => {
        if (err) {
          reject(err);
        }
      });
    });
  }

  static async update(id, queryPortionStr, queryPortionValues) {
    const qu = `UPDATE customers SET ${queryPortionStr} WHERE id= ${id}`;
    new Promise((resolve, reject) => {
      db.run(qu, queryPortionValues, (err) => {
        if (err) {
          reject(Error(err));
        }
      });
    });
  }

  static async delete(id) {
    const querySelector = `DELETE FROM customers WHERE id=?`;
    db.run(querySelector, id);
  }

  static async search(searchValue) {
    const selectQuery = `SELECT * FROM customers WHERE name OR age OR dateOfBirth OR country LIKE '%${searchValue}%'`;
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
    const selectQuery = `SELECT * FROM customers ORDER BY ID DESC LIMIT 1`;
    return new Promise((resolve, reject) => {
      db.query(selectQuery, (err, data) => {
        if (err) {
          throw new Error(err);
        }
        resolve(data);
      });
    });
  }
}

module.exports = Customer;
