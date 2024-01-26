const express = require("express");
const Customercontroller = require("../controller/CustomerController");
const { model } = require("mongoose");
const router = express.Router();

const middlware = require("../middleware/authmiddleware");

// router.post("/create",middlware,Customercontroller.creat);
// router.get("/find-by-id",middlware,Customercontroller.findbyid);
// router.delete("/delecte-by-id",middlware,Customercontroller.deletebyid);
// router.put("/update",middlware,Customercontroller.update);
// router.get("/find-all",middlware,Customercontroller.findAll);


router.post("/create",Customercontroller.creat);
router.get("/find-by-id",Customercontroller.findbyid);
router.delete("/delecte-by-id",Customercontroller.deletebyid);
router.put("/update",Customercontroller.update);
router.get("/find-all",Customercontroller.findAll);

module.exports=router;