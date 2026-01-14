const express = require("express");
const brcypt = require("bcrypt");
const path = require("path");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));
app.set("view engine" , "ejs");
app.set("views" , path.join(__dirname,"views"));


app.get("/",(req,res)=>{
    res.send("Daddy's Home")
});

app.listen(3000);