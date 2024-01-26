const mongoose = require("mongoose");
const Productschema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        description:{
            type:String,
            required:true
        },
        unitPrice:{
            type:Number,
            required:true
        },
        qtyonhand:{
            type:Number,
            required:true
        },
        image:{
            type:String,
            required:true
        }
    }
);

module.exports = mongoose.model('Product',Productschema);