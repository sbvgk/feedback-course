var express    = require("express");
var passport   = require("passport");
var router     = express.Router();
var User       = require("../models/user.js");
var Course     = require("../models/course.js");
var Professor  = require("../models/professor.js");


// root route
router.get("/",function(req,res){
    res.render("landing");
})

router.get("/about",function(req,res){
    res.render("about")
})

router.get("/home",function(req,res){
    res.render("home")
})

//search courses
router.post("/searchCourses",function(req,res){
    var searchTerm = req.body.course;
    Course.find({'title' : new RegExp(searchTerm, 'i')},'title name',function(err,courses){
        if(err){
            console.log(err);
        }
        else{
            res.render("courses/index",{courses:courses, currentUser:req.user});
        }
    })    
})

//search professors
router.post("/searchProfessors",function(req,res){
    var searchTerm = req.body.professor; 
    console.log(searchTerm);
    Professor.find({'name' : new RegExp(searchTerm, 'i')},'name',function(err,professors){
        if(err){
            console.log(err);
        }
        else{
            res.render("professors/index",{professors:professors, currentUser:req.user});
        }
    })    
})


////show register form route
//router.get("/register",function(req, res) {
//    res.render("register");
//})

//handle sign up logic 
router.post("/register",function(req, res) {
    var newUser = new User({
        username:req.body.username,
        uin: req.body.uin
    });
    User.register(newUser,req.body.password,function(err,user){
        if(err){
            req.flash("error",err.message+" .Please sign in to continue!");
            return res.redirect("/login");
        }
        passport.authenticate("local")(req,res,function(){
            req.flash("success","Howdy! Welcome to CourseWalk! "+user.username);
            res.redirect("/courses");
        });
    });
});

//show Login form
router.get("/login",function(req, res) {
    res.render("login");
})

//handling login logic
router.post("/login",passport.authenticate("local",{
     successRedirect:"/courses",
     failureRedirect:"/login"
}),function(req,res){});

//logout route
router.get("/logout",function(req, res) {
    req.logout();
    req.flash("success","Successfully logged out!")
    res.redirect("/courses");
})


module.exports = router;