const db = require("../database/database");

class Customer {
    constructor(options) {
        if(typeof options === "object") {
            this.name = options.name
        }
    }


    static async findById(id) {
        const querySelector = `SELECT * FROM customers WHERE id=? limit 1`;
        return new Promise((resolve, reject) => {
            db.all(querySelector,id, (err, data) => {
                if (err) return reject(err);
                if (data.length > 0) {
                    return resolve(data[0]);
                }
                return resolve([])
            });
        })
    }

    static async getAll(){
        return new Promise((resolve, reject) => {
            db.all("SELECT * FROM customers", (err, data) => {
                if (err) {
                  throw new Error(err);
                }
                resolve(data);
            });
        });
    }

    create() {}

    save() {}

    update() {}

    delete() {}
}

module.exports = Customer