const multer =require("multer");
const {v4:uuidv4}=require('uuid')
const path =require("path");

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"./public/images/uploads") //destination folder
    },
    filename:function(req,file,cb){
        const uniquename= uuidv4(); //gererating a unique file name
        cb(null,uniquename+path.extname(file.originalname));  //use the unique name upload img
    }
});
const upload=multer({storage:storage});

module.exports=upload;