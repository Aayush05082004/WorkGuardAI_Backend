const jwt=require("jsonwebtoken");
const asyncHandler=require("express-async-handler");

const validateToken=asyncHandler(async(req,res,next)=>{
    let token;
    const authToken=req.headers.authorization || req.headers.Authorization;
    if(authToken && authToken.startsWith("Bearer")){
        token=authToken.split(' ')[1];
        try{
            const decoded=jwt.verify(token,process.env.ACCESS_TOKEN)
            req.user=decoded.user;
            next();
        }catch(e){
            res.status(401);
            throw new Error("User is not authorized")
        }
        
        if(!token){
            res.status(401);
            throw new Error("User is not authorized or token is missing")
        }
    }
})
module.exports=validateToken;