var express     = require("express");
var router      = express.Router({mergeParams:true});
var Course      = require("../models/course.js");
var Review      = require("../models/review.js");
var middleware  = require("../middleware");

//reviews new
router.get("/new",middleware.isLoggedIn,function(req,res){
    Course.findById(req.params.id,function(err,course){
        if(err){
            console.log(err);
        }
        else{
            res.render("reviews/new",{course:course});
        }
    })
})
    
//reviews create
router.post("/",middleware.isLoggedIn,function(req,res){
        
        var review = req.body.review;
        Course.findById(req.params.id).populate("reviews").exec(function(err,foundCourse){
            if(err){
                console.log(err);
            }           
            else{
                
                Review.create(review,function(err,newReview){
                    if(err){
                        console.log(err)
                    }
                    else{
                        newReview.author.username = req.user.username;
                        newReview.author.id       = req.user._id;
                        newReview.save();
                        foundCourse.reviews.push(newReview);
                        foundCourse.save();
                        console.log(newReview);
                        req.flash("success","Successfully added review");
                        res.redirect("/courses/"+req.params.id);
                    }
                })
            }
        })
})
    

//reviews edit
router.get("/:review_id/edit",middleware.checkReviewAuthorization,function(req,res){
    
    Review.findById(req.params.review_id,function(err,foundReview){
        if(err){
            res.render("/courses/show")
        }
        else{
            res.render("reviews/edit",{review:foundReview,course_id:req.params.id});
        }
    })
    
})

// reviews update
router.put("/:review_id",middleware.checkReviewAuthorization,function(req,res){
    Review.findByIdAndUpdate(req.params.review_id,req.body.review,function(err,updatedReview){
        if(err){
            res.redirect("courses/"+req.params.id);
        }
        else{
            res.redirect("/courses/"+req.params.id);
        }
    })
})

//reviews delete
router.delete("/:review_id",middleware.checkReviewAuthorization,function(req,res){
    Review.findByIdAndRemove(req.params.review_id,function(err,deletedReview){
        if(err){
            res.redirect("/courses/"+req.params.id);
        }
        else{
            req.flash("success","Successfully Deleted review");
            res.redirect("/courses/"+req.params.id);
        }
    })
})



module.exports = router;