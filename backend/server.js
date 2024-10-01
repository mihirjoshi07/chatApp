const express=require("express");
require("dotenv").config();
const {app,server,io}=require("../backend/socket/socket");
const path=require("path")
require("./utils/connectDb")

console.log(__dirname)
const PORT=process.env.PORT;
const cookieParser=require("cookie-parser")
const cors=require("cors");
console.log("port :",PORT)


app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());



app.use(cors({
    origin: 'http://localhost:5173', // Your React frontend URL
    credentials: true, // This allows sending cookies
  }));

//route imports
const authRoutes=require("./routes/auth");
const messageRoutes=require("./routes/message")
const userRoutes=require("./routes/user");




//route middleware 
app.use("/api",authRoutes)
app.use("/message",messageRoutes)
app.use("/user",userRoutes);
app.use(express.static(path.join(__dirname,"../frontend/dist")));

server.listen(PORT,()=>{
  
    console.log(`our app is running on port ${PORT}`)
})
