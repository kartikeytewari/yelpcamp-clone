const mongoose=require("mongoose");
const campground=require("./models/campgrounds.js");
const comment=require("./models/comments.js");

const data=[
    {
        name: "Lakey Lake",
        image: "https://r-cf.bstatic.com/images/hotel/max1024x768/173/173596950.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dictumst quisque sagittis purus sit amet volutpat consequat. Posuere lorem ipsum dolor sit. Vestibulum lectus mauris ultrices eros in cursus turpis. Justo laoreet sit amet cursus sit amet dictum. Rhoncus mattis rhoncus urna neque viverra justo. Egestas quis ipsum suspendisse ultrices gravida dictum fusce ut. Nunc id cursus metus aliquam eleifend mi in nulla. Orci phasellus egestas tellus rutrum tellus pellentesque eu tincidunt tortor. Faucibus nisl tincidunt eget nullam non. Tellus rutrum tellus pellentesque eu tincidunt tortor aliquam nulla facilisi. Tincidunt id aliquet risus feugiat in ante metus dictum at. Mauris pellentesque pulvinar pellentesque habitant morbi tristique senectus et. Cursus turpis massa tincidunt dui. Non enim praesent elementum facilisis leo vel fringilla est ullamcorper. Sapien et ligula ullamcorper malesuada proin libero nunc. Viverra aliquet eget sit amet tellus. Adipiscing elit ut aliquam purus sit amet. Nec ullamcorper sit amet risus nullam eget. Parturient montes nascetur ridiculus mus mauris vitae ultricies. Fringilla phasellus faucibus scelerisque eleifend donec pretium vulputate. Eleifend donec pretium vulputate sapien nec sagittis. Purus gravida quis blandit turpis. Tempus imperdiet nulla malesuada pellentesque elit eget gravida cum. Accumsan lacus vel facilisis volutpat est velit egestas dui id."
    },
    {
        name: "tapovan camping grounds",
        image: "https://invinciblengo.org/photos/event/slider/mount-abu-trekking-camp-aravalli-hills-rajasthan-nbMgzbA-1440x810.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dictumst quisque sagittis purus sit amet volutpat consequat. Posuere lorem ipsum dolor sit. Vestibulum lectus mauris ultrices eros in cursus turpis. Justo laoreet sit amet cursus sit amet dictum. Rhoncus mattis rhoncus urna neque viverra justo. Egestas quis ipsum suspendisse ultrices gravida dictum fusce ut. Nunc id cursus metus aliquam eleifend mi in nulla. Orci phasellus egestas tellus rutrum tellus pellentesque eu tincidunt tortor. Faucibus nisl tincidunt eget nullam non. Tellus rutrum tellus pellentesque eu tincidunt tortor aliquam nulla facilisi. Tincidunt id aliquet risus feugiat in ante metus dictum at. Mauris pellentesque pulvinar pellentesque habitant morbi tristique senectus et. Cursus turpis massa tincidunt dui. Non enim praesent elementum facilisis leo vel fringilla est ullamcorper. Sapien et ligula ullamcorper malesuada proin libero nunc. Viverra aliquet eget sit amet tellus. Adipiscing elit ut aliquam purus sit amet. Nec ullamcorper sit amet risus nullam eget. Parturient montes nascetur ridiculus mus mauris vitae ultricies. Fringilla phasellus faucibus scelerisque eleifend donec pretium vulputate. Eleifend donec pretium vulputate sapien nec sagittis. Purus gravida quis blandit turpis. Tempus imperdiet nulla malesuada pellentesque elit eget gravida cum. Accumsan lacus vel facilisis volutpat est velit egestas dui id."
    },
    {
        name: "hello world coding camp",
        image: "https://invinciblengo.org/photos/event/slider/manali-girls-special-adventure-camp-himachal-pradesh-1xJtgtx-1440x810.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dictumst quisque sagittis purus sit amet volutpat consequat. Posuere lorem ipsum dolor sit. Vestibulum lectus mauris ultrices eros in cursus turpis. Justo laoreet sit amet cursus sit amet dictum. Rhoncus mattis rhoncus urna neque viverra justo. Egestas quis ipsum suspendisse ultrices gravida dictum fusce ut. Nunc id cursus metus aliquam eleifend mi in nulla. Orci phasellus egestas tellus rutrum tellus pellentesque eu tincidunt tortor. Faucibus nisl tincidunt eget nullam non. Tellus rutrum tellus pellentesque eu tincidunt tortor aliquam nulla facilisi. Tincidunt id aliquet risus feugiat in ante metus dictum at. Mauris pellentesque pulvinar pellentesque habitant morbi tristique senectus et. Cursus turpis massa tincidunt dui. Non enim praesent elementum facilisis leo vel fringilla est ullamcorper. Sapien et ligula ullamcorper malesuada proin libero nunc. Viverra aliquet eget sit amet tellus. Adipiscing elit ut aliquam purus sit amet. Nec ullamcorper sit amet risus nullam eget. Parturient montes nascetur ridiculus mus mauris vitae ultricies. Fringilla phasellus faucibus scelerisque eleifend donec pretium vulputate. Eleifend donec pretium vulputate sapien nec sagittis. Purus gravida quis blandit turpis. Tempus imperdiet nulla malesuada pellentesque elit eget gravida cum. Accumsan lacus vel facilisis volutpat est velit egestas dui id."
    }
];

function seedDB(){
    // deleting campgrounds data
    campground.remove({}, function(error, campground_delete){
        if (error)
        {
            console.log("error encountered while deleting campgrounds");
            console.log(error);
        }
        else
        {
            console.log("campground deleted successfully");
            // deleting comments data
            comment.remove({}, function(error, comments_delete){
                if (error)
                {
                    console.log("error encountered while deleting comments");
                }
                else
                {
                    console.log("comments deleted successfully");
                    // populating comments data
                    for (let i=0;i<=data.length-1;i++)
                    {
                        campground.create(data[i], function(error, campground_new){
                            if (error)
                            {
                                console.log("error encountered while populating campground");
                            }
                            else
                            {
                                console.log("campground data populated successfully");
                                comment.create({
                                    text: "good camp",
                                    author: "illiad"
                                }, function(error, comment_new){
                                    if (error)
                                    {
                                        console.log("error encountered while populating comment");
                                    }
                                    else
                                    {
                                        console.log("comment populated successfully");
                                        campground_new.comments.push(comment_new);
                                        campground_new.save(function(error, data){
                                            if (error)
                                            {
                                                console.log("error data not saved");
                                            }
                                            else
                                            {
                                                console.log("data saved successfully");
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                }
            });
        }
    });
}

module.exports=seedDB;