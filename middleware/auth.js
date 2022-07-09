const db = require("../database/database");
const jwt = require("jsonwebtoken");
const admin = require("../models/admin");

const asyncHandler = require("express-async-handler");
const key = process.env.secretkey;
const auth = async (req, res, next) => {
  const token = req.headers.token;
  const { data } = jwt.verify(token, key);
  const { email, password } = data[0];
  const userExist = admin.checkExist(email);

  console.log(userExist.email === email);
  next();
};
module.exports = auth;
