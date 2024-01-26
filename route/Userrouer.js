const express = require("express");
const usercontroller = require("../controller/Usercontroller");
const { model } = require("mongoose");
const router = express.Router();

router.post("/resgister",usercontroller.Registation);
router.post("/Login",usercontroller.Login);


module.exports=router;