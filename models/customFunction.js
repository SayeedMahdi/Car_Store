const db = require("../database/database");
class customFuntions {
  static async findById(table, id) {
    const querySelector = `SELECT * FROM ${table} WHERE id=? limit 1`;
    return new Promise((resolve, reject) => {
      db.query(querySelector, id, (err, data) => {
        if (data.length > 0) {
          return resolve(data[0]);
        }
        return resolve([]);
      });
    });
  }

  static async getAll(table) {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM ${table}`, (err, data) => {
        if (err) {
          throw new Error(err);
        }
        resolve(data);
      });
    });
  }

  static async update(table, id, queryPortionStr, queryPortionValues) {
    const qu = `UPDATE ${table} SET ${queryPortionStr} WHERE id= ${id}`;
    return new Promise((resolve, reject) => {
      db.query(qu, queryPortionValues, (err) => {
        if (err) {
          reject(Error(err));
        }
      });
      resolve(true);
    });
  }

  static async delete(table, id) {
    const querySelector = `DELETE FROM ${table} WHERE id=?`;
    db.query(querySelector, id);
  }

  static async search(table, searchValue) {
    const selectQuery = `SELECT * FROM ${table} WHERE name OR age OR dateOfBirth OR country LIKE '%${searchValue}%'`;
    return new Promise((resolve, reject) => {
      db.query(selectQuery, (err, data) => {
        if (err) {
          throw new Error(err);
        }
        resolve(data);
      });
    });
  }

  static async lastInserted(table) {
    const selectQuery = `SELECT * FROM ${table} ORDER BY ID DESC LIMIT 1`;
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
module.exports = customFuntions;
