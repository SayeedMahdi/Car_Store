const sharp = require("sharp");

const date = Date.now();


const makeResize = async(req,res ,next)=>{
    var sizes = [1440, 1080, 720, 480];
    for (var i = 0; i < sizes.length; i++) {
       await sharp(req.file.buffer)
        .resize(sizes[i], sizes[i])
        .toFile("upload/"+date+ '-' + sizes[i] + '.jpg');       
    }
     ;
    
}
module.exports = makeResize;
