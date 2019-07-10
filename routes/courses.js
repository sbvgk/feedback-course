var express       = require("express");
var router        = express.Router();
var Course        = require("../models/course.js");
var middleware    = require("../middleware");



//Index route: show all courses
router.get("/",function(req,res){
    Course.find({},function(err,courses){
        if(err){
            console.log(err);
        }
        else{
            res.render("courses/index",{courses:courses, currentUser:req.user});
        }
    })
    
})

//create courses
router.post("/",middleware.isLoggedIn,function(req,res){
            var title = req.body.title;
            var name = req.body.name;
            var description = req.body.description;
            var professor   = req.body.professor;
            var author   = {
                id:req.user._id,
                username:req.user.username
            };
            var course = {title,name,description,professor,author};
    
    Course.create(course,function(err,newCourse){
            if(err){
                console.log(err);
            }
            else{
                req.flash("success","Successfully added course");
                res.redirect("/courses");
            }
            })
    
        })
        

//new route
router.get("/new",middleware.isLoggedIn,function(req, res) {
    res.render("courses/new");
})

//SHOW Route

router.get("/:id",function(req,res){
   
    Course.findById(req.params.id).populate("reviews").populate("textbooks").exec(function(err,foundCourse){
        if(err){
            console.log(err);
        }
        else{
             res.render("courses/show",{course:foundCourse,currentUser:req.user});
             
        }
    })
   
})

//Edit Route
router.get("/:id/edit",middleware.checkCourseOwnership,function(req, res) {
    Course.findById(req.params.id,function(err,foundCourse){
        if(err){
            console.log(err);
        }
        else{
            res.render("courses/edit.ejs",{course:foundCourse});
        }
    })
    
})

//Update Route
router.put("/:id",middleware.checkCourseOwnership,function(req,res){
    Course.findByIdAndUpdate(req.params.id,req.body.course,function(err,updatedCourse){
        if(err){
            console.log(err);
        }
        else{
            res.redirect("/courses/"+req.params.id);
        }
    })
})

//DESTROY route
router.delete("/:id",middleware.checkCourseOwnership,function(req,res){
    Course.findByIdAndRemove(req.params.id,function(err,deletedCourse){
        if(err){
            res.redirect("/courses")
        }
        else{
            req.flash("success","Successfully deleted course!")
            res.redirect("/courses")
        }
    })
})

module.exports   = router;