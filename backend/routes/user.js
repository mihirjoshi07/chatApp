const express=require("express");
const {getchatUsers} = require("../controllers/userController");
const auth = require("../middleware/auth");
const router=express.Router();

router.get("/",auth,getchatUsers)


module.exports=router;