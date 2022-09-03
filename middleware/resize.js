const sharp = require("sharp");
const imageConfig = require("../config/imageConfig");

const makeResize = async (req, res, next) => {
  const file = req.file;
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
};
module.exports = makeResize;
