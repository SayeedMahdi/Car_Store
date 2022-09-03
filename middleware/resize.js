const sharp = require("sharp");
const multer = require("multer");
const imageConfig = require("../config/imageConfig");

const Storage = multer.memoryStorage()
const makeBuffer = multer({storage:Storage})

const makeResize = async (req, res, next) => {
  const file = req.file;
<<<<<<< HEAD
  var filePath = [];

  //make the original size
  imageConfig[0].size = file.size;
  if (!file) {
    res.status(400).json("file is not exist!");
  }

  const flies = imageConfig.map(async (item) => {
    const fileName =
      Date.now() + "-" + item.type + "." + file.mimetype.split("/")[1];
    await sharp(req.file.buffer)
      .resize(item.size)
      .toFile("upload/" + fileName);
    console.log(fileName);
    return fileName;
  });

  console.log(flies);
  req.image = filePath;
=======

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
>>>>>>> 13c702fba7efc78005082697f063eb69b6ccc623
};

module.exports = {
  makeBuffer,makeResize
}
