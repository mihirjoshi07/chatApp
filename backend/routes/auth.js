const express=require("express");
const {signUp,login,logout} = require("../controllers/authController")
const router = require("express").Router();

router.post("/signup",signUp);
router.post("/login",login);
router.get("/logout",logout);

module.exports = router;