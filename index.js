const express = require("express");
const mongoose = require("mongoose");
const app = express();
var cors = require('cors');

const env = require("dotenv");
env.config(); 
const port = process.env.SERVER_PORT || 3000;


const bodyParser = require("body-parser");
app.use(cors());
 

// get router
const userRout = require("./route/Userrouer");
const productRouter = require("./route/ProductRouter");
const customerRouter = require("./route/CustomerRouter");
const OrderRouter = require("./route/OrderRouter");



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
  .connect("mongodb://localhost:27017/posapi")
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.use("/checking", (req, resp) => {
  resp.json({ message: "server is runing!" });
});


app.use("/api/v1/user",userRout);
app.use("/api/v1/customer",customerRouter);
app.use("/api/v1/product",productRouter);
app.use("/api/v1/order",OrderRouter);

