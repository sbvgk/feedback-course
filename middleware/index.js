var Course  = require("../models/course.js");
var Review  = require("../models/review.js");
var Preview  = require("../models/pReview.js");
var Textbook  = require("../models/textbook.js");

var middleware  = {};

// checkCourseOwnership checks the Authrorization of the user
middleware.checkCourseOwnership = function(req,res,next){
    if(req.isAuthenticated()){
        Course.findById(req.params.id,function(err, foundCourse) {
            if(err){
                res.redirect("back");
            }
            else{
                if(foundCourse.author.id.equals(req.user._id)){
                      next();
                }
                else{
                    res.redirect("back");
                }
            }
        })
    }
    else{
        res.redirect("back");
    }
}

//Check professor ownership check the authorization of the user

middleware.checkProfessorOwnership = function(req,res,next){
    if(req.isAuthenticated()){
        Professor.findById(req.params.id,function(err, foundProfessor) {
            if(err){
                res.redirect("back");
            }
            else{
                if(foundProfessor.author.id.equals(req.user._id)){
                      next();
                }
                else{
                    res.redirect("back");
                }
            }
        })
    }
    else{
        res.redirect("back");
    }
}


//Review Authorization

middleware.checkReviewAuthorization  = function (req,res,next){
    if(req.isAuthenticated()){
        Review.findById(req.params.review_id,function(err, foundReview) {
            if(err){
                res.redirect("back");
            }
            else{
                if(foundReview.author.id.equals(req.user._id)){
                    next();
                }
                else{
                    res.redirect("back");
                }
            }
        })
    }
    else{
        res.redirect("back");
    }
}


// professor Review Authorization

middleware.checkPreviewAuthorization  = function (req,res,next){
    if(req.isAuthenticated()){
        Preview.findById(req.params.pReview_id,function(err, foundReview) {
            if(err){
                res.redirect("back");
            }
            else{
                if(foundReview.author.id.equals(req.user._id)){
                    next();
                }
                else{
                    res.redirect("back");
                }
            }
        })
    }
    else{
        res.redirect("back");
    }
}

//Textbook Authorization
middleware.checkTextbookAuthorization  = function (req,res,next){
    if(req.isAuthenticated()){
        Textbook.findById(req.params.textbook_id,function(err, foundTextbook) {
            if(err){
                res.redirect("back");
            }
            else{
                if(foundTextbook.author.id.equals(req.user._id)){
                    next();
                }
                else{
                    res.redirect("back");
                }
            }
        })
    }
    else{
        res.redirect("back");
    }
}

//Check login

middleware.isLoggedIn  = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    else{
        req.flash("error","You need to be logged in to do that!")
        res.redirect("/login");
    }
}



module.exports   = middleware;