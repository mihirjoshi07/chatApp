const express=require("express");
const router=express.Router();
const {sendMessage,getMessages} = require("../controllers/messageController")
const auth=require("../middleware/auth")

router.post("/send/:id",auth,sendMessage);
router.get("/:id",auth,getMessages)

module.exports=router;