const mongoose = require("mongoose");
const Orderschema = new mongoose.Schema(
    {
        date:{
            type:Date,
            required:true
        },
        customerdetails:{
            type:Object,
            required:true
        },
        totalcost:{
            type:Number,
            required:true
        },
        products:{
            type:Array,
            required:true
        }
    }
);

module.exports = mongoose.model('Order',Orderschema);