const express=require("express");
const router=express.Router({mergeParams: true});
const campground=require("../models/campgrounds")
const comment=require("../models/comments");
const user=require("../models/user");
const passport=require("passport");
const middleware=require("../middleware");

// register-get route
router.get("/register", function(req,res){
    res.render("register");
});

// register-post route
router.post("/register", function(req,res){
    let temp=new user({username: req.body.username});
    user.register(temp, req.body.password, function(error, user){
        if (error)
        {
            req.flash("error", error.message);
            console.log(error);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req,res, function(){
            res.redirect("/campgrounds");
        })
    })
})

// login-get route
router.get("/login", function(req,res){
    res.render("login");
});

// login-post route
router.post("/login", passport.authenticate("local", {
    successRedirect : "/campgrounds",
    failureRedirect: "/login"
}), function(req,res){
});

// logout route
router.get("/logout", function(req, res, next){
    req.logout(function(error) {
        if (error) {
            return next(error);
        }
        res.redirect('/campgrounds');
    });
})

module.exports=router;
