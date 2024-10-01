const jwt = require("jsonwebtoken");
const User=require("../models/user.model")
const auth=async(req,res,next)=>{
    try {
        const token =req.cookies.jwt;
        if(!token) return res.status(401).json({error:"unauthorized -  no token found"});

        const decoded=jwt.verify(token,process.env.JWT_SECRET);

        if(!decoded) return res.status(401).json({error:"Unautorized - invalid token"});

        const user=await User.findById(decoded.userId).select("-password");
        
        if(!user) return res.status(404).json({error:"user not found"});
    
        req.user=user;
        next();
    } catch (error) {
        res.status(500).json({error:"Internal Server Error"});
    }
}

module.exports=auth;