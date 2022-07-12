const jwt = require("jsonwebtoken");
const admin = require("../models/admin");

const asyncHandler = require("express-async-handler");
const key = process.env.secretkey;

const auth = asyncHandler(async (req, res, next) => {
  const token = req.headers.token;
  console.log(req.headers);
  const { data } = jwt.verify(token, key);
  const { email, password } = data[0];
  const userExist = await admin.checkExist(email);
  const dbUserEmail = userExist[0].email;
  const dbUserPassword = userExist[0].password;
  if (dbUserEmail === email && dbUserPassword === password) {
    next();
  } else {
    throw new Error("Token is wrong Your are not authorize!");
  }
});
module.exports = auth;
