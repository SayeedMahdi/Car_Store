const multer = require("multer");
const Storage = multer.memoryStorage()
module.exports = multer({storage:Storage})