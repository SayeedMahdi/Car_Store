const db = require("../database/database");

class Admin {
  constructor(options) {
    if (typeof options === "object") {
      (this.fullName = options.fullName),
        (this.email = options.email),
        (this.password = options.password);
    }
  }


  async save(){
    const qu = `INSERT INTO  admin ( fullName, email, password ) VALUES (?,?,?)`;
    const admin = [
      this.fullName,
      this.email,
      this.password
    ];
    new Promise((resolve, reject) => {
      db.query(qu, admin);
    });
  }

  static async lastInserted() {
    const selectQuery = `SELECT * FROM admin ORDER BY ID DESC LIMIT 1`;
    return new Promise((resolve, reject) => {
      db.query(selectQuery, (err, data) => {
        resolve(data);
      });
    });
  }

  static async checkExist(email) {
    const selectQuery = `SELECT * FROM admin WHERE email = ?`;
    return new Promise((resolve, reject) => {
      db.query(selectQuery,email, (err, data) => {
      
        resolve(data);
      });
    });
  } 
}
module.exports = Admin;
