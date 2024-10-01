const mongoose=require("mongoose");
const connectDb=mongoose.connect(process.env.MONGO_DB_URI)

.then(()=>{
    console.log("Database is connected");
}).catch((error)=>{
    console.log(error);
})

module.exports=connectDb;