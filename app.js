const express = require("express");
const app = express();
require("dotenv").config();
const db = require("./database/database");

//middle wares
app.use(express.json());

const port = process.env.PORT
app.listen(port,console.log(`Server is listening on port ${port}`));