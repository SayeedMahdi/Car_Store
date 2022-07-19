const sharp = require("sharp");
const imageConfig = require("../config/imageConfig");
console.log(imageConfig);

const makeResize = async(req,res ,next)=>{
    if(!req.file){
        res.status(400).json("file is not exist!")
    }
    let filePath =[]; 
    var sizes = [1440, 1080, 720, 480];
    for (var i = 0; i < sizes.length; i++) {
        const path = Date.now() + '-' + sizes[i];
       await sharp(req.file.buffer)
        .resize(sizes[i])
        .toFile("upload/"+path + '.jpg');   
        filePath.push(path);    
    }
     req.image = filePath;
    next();
}
module.exports = makeResize;
