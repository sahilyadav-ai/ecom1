var mongoose =require("mongoose");
const plm = require("passport-local-mongoose");
mongoose.connect("mongodb+srv://sy9034431150:sahil123@firstd.vklel9n.mongodb.net/ecoms")
const userschema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    passsword:{
        type:String,
    },
     email:{
      type:String,
      required:true
     },
     img:{
        type:String,
     }
});
userschema.plugin(plm);
module.exports=mongoose.model('user',userschema);
