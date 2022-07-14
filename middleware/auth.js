const jwt = require("jsonwebtoken");
const admin = require("../models/admin");

const asyncHandler = require("express-async-handler");
const key = process.env.secretkey;

const auth = asyncHandler(async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const { data } = jwt.verify(token, key);
  const { email, password } = data[0];
  const userExist = await admin.checkExist(email);
  const dbUserEmail = userExist[0].email;
  const dbUserPassword = userExist[0].password;

  if (dbUserEmail === email && dbUserPassword === password) {
    next();
  } else {
    res.status(401)
    throw new Error("Token is wrong Your are not authorize!");
  }

});
module.exports = auth;
