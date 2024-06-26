var express = require('express');
var router = express.Router();
var uploads = require("./multer")
// const {updateprofilecontroler}=require("../controller/ usercontroller")

var usermodel = require("./users")
const passport = require("passport");
const localStrategy =require("passport-local");
passport.use(new localStrategy(usermodel.authenticate()));




/* GET home page. */
router.get('/register', function(req, res, next) {
  res.render('register');
});


router.get("/profile",isloggedin,async function(req,res){
  const userdata = await usermodel.findById(req.user._id)
  console.log(userdata)
  res.render("profile",{userdata})
})

router.get('/login',function(req,res,next){
  res.render('login')
})

router.post('/register', function(req, res, next) {
  const userdata=new usermodel({
    username:req.body.username,
    email:req.body.email
  }) 
  usermodel.register(userdata,req.body.password).then(function(){
    passport.authenticate("local")(req,res,function(){
      res.redirect("/profile")
    })
  })
});

router.post("/login",passport.authenticate("local",{
  successRedirect:"/profile",
  failureRedirect:"/login"
}),function(req,res){})

router.get("/logout",function(req,res){
  req.logout(function(err){
    if(err){
      return next(err);
    }
    res.redirect('/');
  })
})
function isloggedin(req,res,next){
  if(req.isAuthenticated()) return next();
  res.redirect('/login');
}

// update profile
router.get("/update",isloggedin ,function(req,res){
  res.render("update")
})
router.post("/profile-update/",isloggedin,async function(req,res){
  // const {_id} = req.params
  const user = await usermodel.findOne(req.user._id)
  const {username,email}=req.body
  if(username) user.username=username
  if(email) user.email=email 

  await user.save()

  res.send("success")
})

// upload img 
router.post("/img",async function(req,res){
  const user = await usermodel.findone(req.user._id)
  const img=req.body
  if(img) user.img=img
  await user.save()

  res.redirect('/profile')
})


module.exports = router;
