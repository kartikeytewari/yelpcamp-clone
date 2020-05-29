const mongoose=require("mongoose");
const comments_schema=new mongoose.Schema({
    text: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        },
        username: String
    }
});

module.exports=mongoose.model("comments", comments_schema);