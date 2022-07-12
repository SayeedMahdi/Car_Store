const Admin = require("../models/admin");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const saltRounds = 10;
var jwt = require("jsonwebtoken");

const signUp = asyncHandler(async (req, res) => {
    let { fullName, email, password } = req.body;
    const isExist = await Admin.checkExist(email);
    if (isExist.length !== 0) {
      res.status(409);
      throw new Error("Admin Already Exist!");
    }
    password =await bcrypt.hash(password, saltRounds);
    
    const admin = {
      fullName,
      email,
      password,
    };
    const newAdmin = new Admin(admin);
    await newAdmin.save();
    const findAdmin = await Admin.lastInserted();
    const token = generateToken(findAdmin[0]);
    res.status(200).json({...findAdmin[0],token});

});

const signIn = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const findAdmin = await Admin.checkExist(email);
  if (findAdmin.length === 0) {
    res.status(404);
    throw new Error("Admin not found!");
  }
  const passwordResult = await comparePassword(password, findAdmin[0].password);
  if (!passwordResult) {
    res.status(400);
    throw new Error("password is Invalid!");
  }
  const token = generateToken(findAdmin);
  res.status(200).json({...findAdmin[0],token});
});

const generateToken = (data) => {
    const secret = process.env.secretkey;
    return jwt.sign({ data: data }, secret, { expiresIn: "1h" });
};
const comparePassword = (newPassword, hash) => {
  return bcrypt.compare(newPassword, hash);
};
module.exports = {
  signUp,
  signIn,
};
