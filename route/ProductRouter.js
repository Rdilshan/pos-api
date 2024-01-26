const express = require("express");
const ProductController = require("../controller/ProductController");
const { model } = require("mongoose");
const router = express.Router();

const middlware = require("../middleware/authmiddleware");

// router.post("/create",middlware,ProductController.creat);
// router.get("/find-by-id",middlware,ProductController.findbyid);
// router.delete("/delecte-by-id",middlware,ProductController.deletebyid);
// router.put("/update",middlware,ProductController.update);
// router.get("/find-all",middlware,ProductController.findAll);

router.post("/create",ProductController.creat);
router.get("/find-by-id",ProductController.findbyid);
router.delete("/delecte-by-id",ProductController.deletebyid);
router.put("/update",ProductController.update);
router.get("/find-all",ProductController.findAll);

module.exports=router;