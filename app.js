const express = require("express");
const bcrypt = require("bcrypt");
const path = require("path");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const userModel = require("./models/user");
const postModel = require("./models/post");
const ejs = require("ejs");
const multer  = require('multer');
const crypto = require("crypto")


const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


app.get("/", (req, res) => {
    res.render("index");
});

app.post("/register", async (req, res) => {
    const { name, username, email, password, age } = req.body;
    if(!name || !username || !email || !password || !age){
        return res.status(500).send("all fields are required!");
    }
    let user = await userModel.findOne({ email });
    if (user) {
        return res.status(500).send("user already registered!");
    }

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            console.log("hashed password : ", hash);
            let user2 = await userModel.create({
                name,
                username,
                email,
                age,
                password: hash
            })

            let token = jwt.sign({ email, userID: user2._id }, "secretKey");
            res.cookie("token", token);
            res.send("registered!");
        })
    })

});

app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/profile", isLoggedIn , async (req, res) => {
    let user = await userModel.findOne({email:req.user.email}).populate("posts");
    // console.log(user);
    res.render("profile" ,{user});
});

app.get("/like/:id", isLoggedIn , async (req, res) => {
    const {id} = req.params;
    let post = await postModel.findOne({_id:id}).populate("username");
    console.log("req.user from isLoggedIn :", req.user);
    
    if(post.likes.indexOf(req.user.userID) === -1){
        post.likes.push(req.user.userID);
    }else{
        post.likes.splice(post.likes.indexOf(req.user.userID),1);
    }
    await post.save();
    
    console.log("post liked :-" , post);
    res.redirect("/profile");
});

app.get("/edit/:id", isLoggedIn , async (req, res) => {
    const {id} = req.params;
    let post = await postModel.findOne({_id:id}).populate("username");
    console.log("req.user from isLoggedIn :", req.user);
    
    
    res.render("edit.ejs" , {post});
});

app.post("/edit/:id", isLoggedIn , async (req, res) => {
    const {id} = req.params;
    const {content} = req.body;

    let post = await postModel.findOneAndUpdate({_id:id} , {content:content}, {new: true});
    console.log("req.user from isLoggedIn :", req.user);
    console.log("post edited :-" , post);
    
    res.redirect("/profile");
});

app.post("/post", isLoggedIn , async (req, res) => {
    let user = await userModel.findOne({email:req.user.email});
    let post  = await postModel.create({
        username: user._id,
        content:req.body.content
    })
    user.posts.push(post._id);
    await user.save();
    res.redirect("/profile");
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    let findUser = await userModel.findOne({email})
    if(!findUser) return res.status(500).send("user not found!");

    bcrypt.compare(password,findUser.password,(err,result)=>{
        if(result){
            let token = jwt.sign({email,userID:findUser._id},"secretKey");
            res.cookie("token",token);
            res.status(200).redirect("/profile");
        }else{
            res.status(500).send("access denied!");
        }
    })
});

app.get("/logout",(req,res)=>{
    res.cookie("token","");
    res.redirect("/");
});

function isLoggedIn(req,res,next){
    // Check if token is falsy (undefined, null, or "")
    if(!req.cookies.token){
        res.redirect("/login");
    }else{
        let data = jwt.verify(req.cookies.token,"secretKey");
        req.user = data;
        next();
    }
};

app.listen(3000);