var express       = require("express");
var router        = express.Router();
var Professor        = require("../models/professor.js");
var middleware    = require("../middleware");
var Review = require("../models/pReview.js");



//Index route: show all professors
router.get("/",function(req,res){
    Professor.find({},function(err,professors){
        if(err){
            console.log(err);
        }
        else{
            res.render("professors/index",{professors:professors, currentUser:req.user});
        }
    })
    
})

//create professors
router.post("/",middleware.isLoggedIn,function(req,res){
            var title = req.body.title;
            var name = req.body.name;
            
            var author   = {
                id:req.user._id,
                username:req.user.username
            };
            var professor = {title,name,author};
    
    Professor.create(professor,function(err,newProfessor){
            if(err){
                console.log(err);
            }
            else{
                req.flash("success","Successfully added professor");
                res.redirect("/professors");
            }
            })
    
        })
        

//new route
router.get("/new",middleware.isLoggedIn,function(req, res) {
    res.render("professors/new");
})

//SHOW Route

router.get("/:id",function(req,res){
   
    Professor.findById(req.params.id).populate("reviews").exec(function(err,foundProfessor){
        if(err){
            console.log(err);
        }
        else{
             res.render("professors/show",{professor:foundProfessor,currentUser:req.user});
             
        }
    })
   
})
//Edit Route
//middleware.checkCampgroundOwnership  "pass in the middle parameter once login is setup"
router.get("/:id/edit",function(req, res) {
    Professor.findById(req.params.id,function(err,foundProfessor){
        if(err){
            console.log(err);
        }
        else{
            res.render("professors/edit.ejs",{professor:foundProfessor});
        }
    })
    
})

//Update Route
//middleware.checkCampgroundOwnership  "pass in the middle parameter once login is setup"
router.put("/:id",function(req,res){
    Professor.findByIdAndUpdate(req.params.id,req.body.professor,function(err,updatedProfessor){
        if(err){
            console.log(err);
        }
        else{
            res.redirect("/professors/"+req.params.id);
        }
    })
})

//DESTROY route
//middleware.checkCampgroundOwnership  "pass in the middle parameter once login is setup"
router.delete("/:id",function(req,res){
    Professor.findByIdAndRemove(req.params.id,function(err,deletedProfessor){
        if(err){
            res.redirect("/professors")
        }
        else{
            req.flash("success","Successfully deleted professor!")
            res.redirect("/professors")
        }
    })
})

module.exports   = router;