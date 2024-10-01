const {Server} = require("socket.io");
const express = require("express");
const http = require("http");

const app=express();
const server=http.createServer(app);

const io=new Server(server,{
    cors:{
        origin:["http://localhost:5173"],
        methods:["GET,POST"]
    }
});

let userSocketMap={} //{userId : socketId}

 const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
};

io.on("connection",(socket)=>{
    console.log("User connect with id : ",socket.id);
    const userId=socket.handshake.query.userId;
    if(userId != "undefined") userSocketMap[userId]=socket.id;
    io.emit("getOnlineUsers",Object.keys(userSocketMap));
    socket.on("disconnect",()=>{
        console.log("User disconnected with id ",socket.id);
        delete userSocketMap[userId];
    io.emit("getOnlineUsers",Object.keys(userSocketMap));

    })
})




module.exports={app,server,io,getReceiverSocketId};