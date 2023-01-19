// importing files
const express=require("express");
const app=express();
const body_parser=require("body-parser");
const mongoose=require("mongoose");
const flash=require("connect-flash");
const passport=require("passport");
const local_strategy=require("passport-local");
const method_override=require("method-override");
const campground=require("./models/campgrounds");
const comment=require("./models/comments");
const user=require("./models/user");
const seedDB=require("./seedDB.js");

// importing routes
const campground_routes=require("./routes/campgrounds.js");
const comment_routes=require("./routes/comments.js");
const auth_routes=require("./routes/auth.js");

// configuring app
app.use(body_parser.urlencoded({ extended: true }));
app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));
app.use(method_override("_method"));
app.use(flash());

// configuring mongoose
const db_url = process.env.database_url || "mongodb://localhost/yelpcamp"
mongoose.set('strictQuery', false);
console.log("process.env.database_url = " + process.env.database_url);
console.log("db_url = " + db_url);
mongoose.connect(db_url);



// passport configuration
app.use(require("express-session")({
    secret: "bjhevbjfwheihifhwuoahouhuhoububljabjbvran.vn",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new local_strategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

app.use(function(req,res,next){
    res.locals.user=req.user;
    res.locals.error=req.flash("error");
    res.locals.success=req.flash("success");
    next();
});

// root route
app.get("/",function(req,res){
    res.render("home");
})

app.use(auth_routes);
app.use("/campgrounds", campground_routes);
app.use("/campgrounds/:id/comments", comment_routes);

const port=process.env.PORT || 8000;
app.listen(port, process.env.IP, function(){
    console.log("The Yelpcamp server have started at port " +  port);
})
