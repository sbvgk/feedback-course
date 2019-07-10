var express     = require("express");
var router      = express.Router({mergeParams:true});
var Professor      = require("../models/professor.js");
var Review      = require("../models/pReview.js");
var middleware  = require("../middleware");

//reviews new
router.get("/new",middleware.isLoggedIn,function(req,res){
    Professor.findById(req.params.id,function(err,professor){
        if(err){
            console.log(err);
        }
        else{
            res.render("pReviews/new",{professor:professor});
        }
    })
})
    
//reviews create
router.post("/",middleware.isLoggedIn,function(req,res){
        
        var review = req.body.review;
        Professor.findById(req.params.id).populate("reviews").exec(function(err,foundProfessor){
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
                        foundProfessor.reviews.push(newReview);
                        foundProfessor.save();
                        console.log(newReview);
                        req.flash("success","Successfully added review");
                        res.redirect("/professors/"+req.params.id);
                    }
                })
            }
        })
})


//reviews edit
router.get("/:pReview_id/edit",middleware.checkPreviewAuthorization,function(req,res){
    
    Review.findById(req.params.pReview_id,function(err,foundReview){
        if(err){
            res.render("/professors/show")
        }
        else{
            res.render("pReviews/edit",{pReview:foundReview,professor_id:req.params.id});
        }
    })
    
})

// reviews update
router.put("/:pReview_id",middleware.checkPreviewAuthorization,function(req,res){
    Review.findByIdAndUpdate(req.params.pReview_id,req.body.pReview,function(err,updatedReview){
        if(err){
            res.redirect("professors/"+req.params.id);
        }
        else{
            res.redirect("/professors/"+req.params.id);
        }
    })
})

//reviews delete
router.delete("/:pReview_id",middleware.checkPreviewAuthorization,function(req,res){
    Review.findByIdAndRemove(req.params.pReview_id,function(err,deletedReview){
        if(err){
            res.redirect("/professors/"+req.params.id);
        }
        else{
            req.flash("success","Successfully Deleted review");
            res.redirect("/professors/"+req.params.id);
        }
    })
})



module.exports = router;