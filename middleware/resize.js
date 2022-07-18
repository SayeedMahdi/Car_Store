const sharp = require("sharp");

const makeResize = async(req,res ,next)=>{
    const fileName = Math.round( Math.random()*10);
    const newPhoto =await sharp(req.file.buffer)
    .resize({width:200, height:300})
    .toFile("upload/" + fileName+".jpg");
    console.log(fileName);
    
}
module.exports = makeResize;
