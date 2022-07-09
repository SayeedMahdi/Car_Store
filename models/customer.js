const db = require("../database/database");

const customFuntions = require("./customFunction");
class Customer extends customFuntions {
  constructor(options) {
    if (typeof options === "object") {
      super();
      (this.name = options.name),
        (this.age = options.age),
        (this.country = options.country),
        (this.dateOfBirth = options.dateOfBirth),
        (this.phone = options.phone);
    }
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
}

module.exports = Customer;
