var express     = require("express");
var router      = express.Router({mergeParams:true});
var Course      = require("../models/course.js");
var Review      = require("../models/review.js");
var Textbook    = require("../models/textbook.js");
var middleware  = require("../middleware");

//textbooks new
router.get("/new",middleware.isLoggedIn,function(req,res){
    Course.findById(req.params.id,function(err,course){
        if(err){
            console.log(err);
        }
        else{
            res.render("textbooks/new",{course:course});
        }
    })
})
    
//textbooks create
router.post("/",middleware.isLoggedIn,function(req,res){
        
        var textbook = req.body.textbook;
        Course.findById(req.params.id).populate("textbooks").exec(function(err,foundCourse){
            if(err){
                console.log(err);
            }
            else{
                
                Textbook.create(textbook,function(err,newTextbook){
                    if(err){
                        console.log(err)
                    }
                    else{
                        newTextbook.author.username = req.user.username;
                        newTextbook.author.id       = req.user._id;
                        newTextbook.save();
                        foundCourse.textbooks.push(newTextbook);
                        foundCourse.save();
                        req.flash("success","Successfully added textbook");
                        res.redirect("/courses/"+req.params.id);
                    }
                })
            }
        })
})


//textbooks edit
router.get("/:textbook_id/edit",middleware.checkTextbookAuthorization,function(req,res){
    
    Textbook.findById(req.params.textbook_id,function(err,foundTextbook){
        if(err){
            res.render("/courses/show")
        }
        else{
            res.render("textbooks/edit",{textbook:foundTextbook,course_id:req.params.id});
        }
    })
    
})

// textbooks update
router.put("/:textbook_id",middleware.checkTextbookAuthorization,function(req,res){
    Textbook.findByIdAndUpdate(req.params.textbook_id,req.body.textbook,function(err,updatedTextbook){
        if(err){
            res.redirect("courses/"+req.params.id);
        }
        else{
            res.redirect("/courses/"+req.params.id);
        }
    })
})

//textbooks delete
router.delete("/:textbook_id",middleware.checkTextbookAuthorization,function(req,res){
    Textbook.findByIdAndRemove(req.params.textbook_id,function(err,deletedTextbook){
        if(err){
            res.redirect("/courses/"+req.params.id);
        }
        else{
            req.flash("success","Successfully Deleted textbook");
            res.redirect("/courses/"+req.params.id);
        }
    })
})



module.exports = router;