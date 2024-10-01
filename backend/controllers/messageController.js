const { default: mongoose } = require("mongoose");
const Conversation=require("../models/conversation.model");
const Message = require("../models/message.model");
const { io,getReceiverSocketId } = require("../socket/socket");
exports.sendMessage=async(req,res)=>{
    try {
        const {message}=req.body;
        const {id:receiverId}=req.params;
        const senderId=req.user._id;
       

        let conversation=await Conversation.findOne({participants:{$all:[senderId,receiverId]}});

        if(!conversation)
        {
            conversation=await Conversation.create({
                participants:[senderId,receiverId]
            });
        }

        const newMesssage= new Message({
            senderId,
            receiverId,
            message
        });
        
        if(newMesssage)
            conversation.messages.push(newMesssage);

   //   Socket will go here
   
        await Promise.all([conversation.save(),newMesssage.save()])
        

        const socketId=getReceiverSocketId(receiverId);
        if(socketId)
            io.to(socketId).emit("newMessage",newMesssage);
        res.status(201).json(newMesssage)

    
    } catch (error) {
        return res.status(500).json({error:"internal server error"});
    }
    
}

exports.getMessages=async(req,res)=>{
   try {
    const { id: otherUser } = req.params;
    const loggedInuser = req.user._id;
   
    
    if (otherUser === loggedInuser.toString()) {
        return res.status(400).json({ error: "Sender and receiver cannot be the same" });
    }
        const conversation=await Conversation.findOne({participants:{$all:[loggedInuser,otherUser]}}).populate("messages");
        if(!conversation) return res.status(404).json({error:"No conversation found"});
        const messages=conversation.messages;
        return res.status(200).json(messages);
   } catch (error) {
        return res.status(500).json({Error:"Internal Server Error"});
   }
}

    