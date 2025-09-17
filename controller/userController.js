const asyncHandler=require("express-async-handler");
const user=require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt=require("jsonwebtoken");

// @Desc for register
const registerUser=asyncHandler(async(req,res)=>{
    const {username,email,password}=req.body;
    if(!username || !email || !password){
        res.status(404);
        throw new Error('All fields are mandatory');
    }
    const userEmailExist=await user.findOne({email});
    if(userEmailExist){
        res.status(400);
        throw new Error("User Already exists");
    }
    console.log(password);
    const hashedPassword=await bcrypt.hash(password,10);
    console.log("hashedPassword",hashedPassword);
    const newUser=await user.create({
        username,
        email,
        password:hashedPassword,
    })
    console.log("User created");
    if(newUser){
        res.status(201).json({
            _id:newUser.id,
            username : newUser.username,
            email:newUser.email
        })
    }else{
        res.status(400);
        throw new Error("Invalid data");
    }
    // res.send(username+","+ email+","+password);
})

// @Desc for login 
const loginUser=asyncHandler(async(req,res)=>{
    const {email,password}=req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const userLogin=await user.findOne({email});
    if(userLogin && await(bcrypt.compare(password,userLogin.password))){
        const accessToken=jwt.sign({
            user:{
                username:userLogin.username,
                email:userLogin.email,
                id:userLogin.id
            }
        },process.env.ACCESS_TOKEN,
        {expiresIn:"15m"}
    )
    res.status(200).json(accessToken)
    }else{
        res.status(401);
        throw new Error("email or password is invalid")
    }
    // res.send(email +","+password);
})

// @Desc for current user
const currentUser=asyncHandler(async(req,res)=>{
    res.json(req.user);
})

module.exports={registerUser, loginUser,currentUser}