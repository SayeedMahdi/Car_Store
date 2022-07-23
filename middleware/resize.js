const sharp = require("sharp");
const multer = require("multer");
const imageConfig = require("../config/imageConfig");

const Storage = multer.memoryStorage()
const makeBuffer = multer({storage:Storage})

const makeResize = async (req, res, next) => {
  const file = req.file;

  //make the original size
  if (file == undefined || !req.body) { return  res.status(400).json("file is not exist!");}

  imageConfig[0].size = file.size;
  const imagePaths = imageConfig.map((item) => {
    const fileName = Date.now() + "-" + item.type + "." + file.mimetype.split("/")[1];
    sharp(req.file.buffer)
      .resize(item.size)
      .toFile("upload/" + fileName).then((img) =>{

      })
      return fileName;
  });

  req.body.imagePaths = imagePaths;
  next();
};

module.exports = {
  makeBuffer,makeResize
}
