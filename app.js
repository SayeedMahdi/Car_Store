const express = require("express");
const app = express();
const {errorHandler}= require("./middleware/errorHandler");
const cors = require("cors");

require("dotenv").config();
const router = require("./router");

//middle wares
app.use(cors({}));
app.use(express.json());
app.use("/api/v1/admin",router);

app.use(errorHandler);


const port = process.env.PORT
app.listen(port,console.log(`Server is listening on port ${port}`));