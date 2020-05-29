const express=require("express");
const router=express.Router({mergeParams: true});
const campground=require("../models/campgrounds")
const comment=require("../models/comments");
const user=require("../models/user");
const middleware=require("../middleware");

// comments-new route
router.get("/new", middleware.isloggedin, function(req,res){
    campground.findById(req.params.id, function(error, campground){
        if (error)
        {
            console.log("error encountered while searching campground");
        }
        else
        {
            console.log("campground searched successfully");
            res.render("comments/new", {campground: campground});
        }
    })
})

// comment-new routes
router.post("/", middleware.isloggedin, function(req,res){
    campground.findById(req.params.id, function(error, campground_found){
        if (error)
        {
            console.log(error);
            res.redirect("/campgrounds");
        }
        else
        {
            console.log("===============");
            comment.create(req.body.comment, function(error, comment_new){
                if (error)
                {
                    console.log(error);
                }
                else
                {
                    comment_new.author.id=req.user.id;
                    comment_new.author.username=req.user.username;
                    comment_new.save();
                    campground_found.comments.push(comment_new);
                    campground_found.save();
                    res.redirect("/campgrounds/"+campground_found.id);
                }
            })
        }
    })
});

// comment edit route
router.get("/:comment_id/edit", middleware.check_comment_ownership, function(req,res){
    comment.findById(req.params.comment_id, function(error,comment_found){
        if (error)
        {
            console.log(error);
            res.redirect("back");
        }
        else
        {
            res.render("comments/edit",{comment:comment_found, campground_id:req.params.id});
        }
    })
})

// comment update route
router.put("/:comment_id", middleware.check_comment_ownership, function(req,res){
    comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(error, comment_update){
        if (error)
        {
            console.log(error);
            res.redirect("back");
        }
        else
        {
            console.log(comment);
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});

// comment delete route
router.delete("/:comment_id", middleware.check_comment_ownership, function(req,res){
    comment.findByIdAndDelete(req.params.comment_id, function(error){
        if (error)
        {
            res.redirect("back");
        }
        else
        {
            req.flash("success", "Comment Deleted!");
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});

module.exports=router;
