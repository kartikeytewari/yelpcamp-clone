const campground=require("../models/campgrounds");
const comment=require("../models/comments");

const middleware_obj={};

middleware_obj.check_campground_ownership = function check_campground_ownership(req,res,next){
    // checks if the user is logged in
    if (req.isAuthenticated())
    {
        campground.findById(req.params.id, function(error, campground_found){
            if (error)
            {
                console.log(error);
                req.flash("error", "Cannot find the Campground");
                res.render("/campgrounds");
            }
            else
            {
                // checks if the user is the author
                if (campground_found.author.id.equals(req.user.id))
                {
                    next();
                }
                else
                {
                    req.flash("error", "You do not have the permission to perform edit on this campground");
                    res.redirect("back");
                }
            }
        })
    }
    else
    {
        req.flash("error", "Please login to proceed");
        res.redirect("back")
    }
}


middleware_obj.check_comment_ownership = function check_comment_ownership(req,res,next)
{
    // check if the user is logged in
    if (req.isAuthenticated())
    {
        comment.findById(req.params.comment_id, function(error, comment_found){
            if (error)
            {
                req.flash("error", "Cannot find comment");
                console.log(error);
                res.redirect("back");
            }
            else
            {
                // check if the user is author of post
                if (comment_found.author.id.equals(req.user.id))
                {
                    next();
                }
                else
                {
                    req.flash("error", "You do not have the permission to perform edit on this comment");
                    res.redirect("back");
                }
            }
        });
    }
    else
    {
        req.flash("error", "Please login to proceed");
        res.redirect("back");
    }
}

middleware_obj.isloggedin = function isloggedin (req,res,next){
    if (req.isAuthenticated())
    {
        return next();
    }
    req.flash("error", "Please login to proceed");
    res.redirect("/login");
}

module.exports= middleware_obj;
