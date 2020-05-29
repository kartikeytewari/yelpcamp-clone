const express=require("express");
const router=express.Router({mergeParams: true});
const campground=require("../models/campgrounds")
const comment=require("../models/comments");
const user=require("../models/user");
const middleware=require("../middleware");

// index route
router.get("/", function(req,res){
    campground.find({},function(error,campgrounds){
        if (error)
        {
            console.log("we have encountered error");
            console.log(error);
        }
        else
        {
            console.log("search request was successfull");
            res.render("campgrounds/index",{campground:campgrounds});
        }
    });
});

// create route
router.post("/", middleware.isloggedin, function(req,res){
    // create a new object campground
    var temp=new campground({
        name: req.body.name,
        image: req.body.image_url,
        description: req.body.description,
        author:{
            id: req.user.id,
            username: req.user.username
        },
        price: req.body.price
    });

    // add the object in the array
    campground.create(temp,function(error,campgrounds){
        if (error)
        {
            console.log("we have encountered error");
            console.log(error);
        }
        else
        {
            console.log("campground saved sucessfully");
            console.log(campgrounds);
        }
    });

    res.redirect("/campgrounds");
});

// new route
router.get("/new", middleware.isloggedin, function(req,res){
    res.render("campgrounds/new");
})

// show route
router.get("/:id",middleware.isloggedin, function(req,res){
    campground.findById(req.params.id).populate("comments").exec(function(error,campground_found){
        if (error)
        {
            console.log("error encountered while finding campground data");
        }
        else
        {
            console.log("campground data found sucessfully");
            res.render("campgrounds/details",{campground:campground_found});
        }
    });
});

// edit campground route
router.get("/:id/edit", middleware.check_campground_ownership, function(req,res){
    campground.findById(req.params.id, function(error, campground_found){
        if (error)
        {
            res.redirect("/");
        }
        else
        {
            res.render("campgrounds/edit", {campground:campground_found});
        }
    })
})

// update campground route
router.put("/:id", middleware.check_campground_ownership, function(req,res){
    campground.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        image: req.body.image_url,
        description: req.body.description,
        price: req.body.price
        }, function(error, campground_update){
        if (error)
        {
            console.log(error);
            res.redirect(req.params.id+"/edit");
        }
        else
        {
            res.redirect(req.params.id);
        }
    })
});

// destroy campground route
router.delete("/:id", middleware.check_campground_ownership, function(req,res){
    campground.findByIdAndRemove(req.params.id, function(error, campground_delete){
        if (error)
        {
            console.log(error);
            res.redirect("/campgrounds/"+req.params.id);
        }
        else
        {
            comment.deleteMany({
                _id:{$in: campground_delete.comments}
                }, function(error){
                if (error)
                {
                    console.log(error);
                    res.redirect("/campgrounds");
                }
                else
                {
                    req.flash("success", "Campground Deleted!");
                    res.redirect("/campgrounds");
                }
            });
        }
    });
});

module.exports=router;
