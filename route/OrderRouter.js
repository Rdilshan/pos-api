const express = require("express");
const OrderController = require("../controller/OrderController");
const { model } = require("mongoose");
const router = express.Router();

const middlware = require("../middleware/authmiddleware");

router.post("/create",middlware,OrderController.creat);
router.get("/find-by-id",middlware,OrderController.findbyid);
router.delete("/delecte-by-id",middlware,OrderController.deletebyid);
router.put("/update",middlware,OrderController.update);
router.get("/find-all",middlware,OrderController.findAll);

module.exports=router;