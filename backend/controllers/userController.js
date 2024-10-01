const User=require("../models/user.model");
exports.getchatUsers=async(req,res)=>{
    try {
            const userId=req.user._id;

            const users=await User.find({_id:{$ne:userId}}).select("fullName profilePic");
            if(!users) return res.status(404).json({Error:"There is no other user found than you"});
            return res.status(200).json(users);
                        
    } catch (error) {
        return res.status(500).json({error:"internal server error"});
    }
}