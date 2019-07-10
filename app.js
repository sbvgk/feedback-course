
var express                 = require('express'),
    app                     = express(),
    User                    = require("./models/user.js"),
    mongoose                = require("mongoose"),
    passport                = require("passport"),
    localStrategy           = require("passport-local"),
    passportLocalMongoose   = require("passport-local-mongoose"),
    bodyParser              = require("body-parser"),
    methodOverride          = require("method-override"),
    Course                  = require("./models/course.js"),
    Review                  = require("./models/review.js"),
    Textbook                = require("./models/textbook.js"),
    path                    = require('path'),
    createError             = require('http-errors'),
    cookieParser            = require('cookie-parser'),
    flash                   = require('connect-flash'),
    logger                  = require('morgan');

//requiring routes

var courseRoutes            = require("./routes/courses.js"),
    professorRoutes         = require("./routes/professors.js"),
    reviewRoutes            = require("./routes/reviews.js"),
    pReviewRoutes            = require("./routes/pReviews.js"),
    textbookRoutes          = require("./routes/textbooks.js"),
    indexRoutes             = require("./routes/index.js");
    adminRoutes             = require("./routes/admin.js");

//Database connection


//var url = process.env.DATABASEURL || "mongodb://localhost/courseWalk" ;

//var url = "mongodb://istm631:istm631@ds125616.mlab.com:25616/coursewalk";
var url = "mongodb://coursewalk:coursewalk123@ds127646.mlab.com:27646/coursewalk_deployment"
mongoose.connect(url);

//var usersRouter = require('./routes/users');


app.use(bodyParser.urlencoded({extended:true}));
//app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(flash());

//Passport Configuration

app.use(require("express-session")({
    secret:"my first web application",
    resave:false,
    saveUninitialized:true
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
}); 

app.use("/courses",courseRoutes);
app.use("/courses/:id/reviews",reviewRoutes);
app.use("/courses/:id/textbooks",textbookRoutes);
app.use("/professors",professorRoutes);
app.use("/professors/:id/pReviews",pReviewRoutes);
app.use(indexRoutes);
app.use("/admin",adminRoutes);

//for deployment in Heroku
//app.listen(process.env.PORT,process.env.IP,function(){
//    console.log("The courseWalk server has started");
//});

//set server port and IP address (for local setup)
app.listen(3000,function(){
    console.log("The courseWalk server has started");
});

module.exports = app;
