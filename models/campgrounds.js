const mongoose=require("mongoose");
var campground_schema=new mongoose.Schema({
    "name": String,
    "image": String,
    "description": String,
    "author": {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        },
        username: String
    },
    "comments":[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "comments"
        }
    ],
    "price": String
});

module.exports = mongoose.model("campground",campground_schema);