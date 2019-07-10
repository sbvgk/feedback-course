
var express     = require("express");
var router      = express.Router({mergeParams:true});
var Course      = require("../models/course.js");
var Review      = require("../models/review.js");
var Textbook    = require("../models/textbook.js");
var middleware  = require("../middleware");

//Index route: show admin index page
router.get("/",function(req,res){
    Course.find({}).populate("reviews").populate("textbooks").exec(function(err,courses){
        if(err){
            console.log(err);
        }
        else{
            res.render("admin/index",{courses:courses, currentUser:req.user});
        }
    })      
})



//create courses
//router.post("/",middleware.isLoggedIn,function(req,res){
//            var title = req.body.title;
//            var name = req.body.name;
//            var description = req.body.description;
//            var author   = {
//                id:req.user._id,
//                username:req.user.username
//            };
//            var course = {title,name,description,author};
//    
//    Course.create(course,function(err,newCourse){
//            if(err){
//                console.log(err);
//            }
//            else{
//                req.flash("success","Successfully added course");
//                res.redirect("/courses");
//            }
//            })
//    
//        })
        

//new route
//router.get("/courses/new",middleware.isLoggedIn,function(req, res) {
//    res.render("admin/courses/new");
//})


//Edit Route
router.get("/courses/:id/edit",function(req, res) {
    Course.findById(req.params.id,function(err,foundCourse){
        if(err){
            console.log(err);
        }
        else{
            res.render("admin/courses/edit.ejs",{course:foundCourse});
        }
    })
    
})

//Update Route
router.put("/courses/:id",function(req,res){
    Course.findByIdAndUpdate(req.params.id,req.body.course,function(err,updatedCourse){
        if(err){
            console.log(err);
        }
        else{
            res.redirect("/admin");
        }
    })
})

//DESTROY route
router.delete("/courses/:id",function(req,res){
    Course.findByIdAndRemove(req.params.id,function(err,deletedCourse){
        if(err){
            res.redirect("/courses")
        }
        else{
            req.flash("success","Successfully deleted course!")
            res.redirect("/admin");
        }
    })
})

//Review Routes/////////////////////////////////////////


//reviews edit
router.get("/courses/:id/reviews/:review_id/edit",function(req,res){
    
    Review.findById(req.params.review_id,function(err,foundReview){
        if(err){
            res.render("/courses/show")
        }
        else{
            res.render("admin/reviews/edit",{review:foundReview,course_id:req.params.id});
        }
    })
    
})

// reviews update
router.put("/courses/:id/reviews/:review_id",function(req,res){
    Review.findByIdAndUpdate(req.params.review_id,req.body.review,function(err,updatedReview){
        if(err){
            res.redirect("courses/"+req.params.id);
        }
        else{
            res.redirect("/admin");
        }
    })
})

//reviews delete
router.delete("/courses/:id/reviews/:review_id",function(req,res){
    Review.findByIdAndRemove(req.params.review_id,function(err,deletedReview){
        if(err){
            res.redirect("/courses/"+req.params.id);
        }
        else{
            req.flash("success","Successfully Deleted review");
            res.redirect("/admin");
        }
    })
})

//Textbook Routes///////////////////////////////

//textbooks edit
router.get("/courses/:id/textbooks/:textbook_id/edit",function(req,res){
    
    Textbook.findById(req.params.textbook_id,function(err,foundTextbook){
        if(err){
            res.render("/courses/show")
        }
        else{
            res.render("admin/textbooks/edit",{textbook:foundTextbook,course_id:req.params.id});
        }
    })
    
})

// textbooks update
router.put("/courses/:id/textbooks/:textbook_id",function(req,res){
    Textbook.findByIdAndUpdate(req.params.textbook_id,req.body.textbook,function(err,updatedTextbook){
        if(err){
            res.redirect("courses/"+req.params.id);
        }
        else{
            res.redirect("/admin");
        }
    })
})

//textbooks delete
router.delete("/courses/:id/textbooks/:textbook_id",function(req,res){
    Textbook.findByIdAndRemove(req.params.textbook_id,function(err,deletedTextbook){
        if(err){
            res.redirect("/courses/"+req.params.id);
        }
        else{
            req.flash("success","Successfully Deleted textbook");
            res.redirect("/admin");
        }
    })
})


module.exports   = router;