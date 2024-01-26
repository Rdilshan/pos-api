const { assign } = require("nodemailer/lib/shared");
const Product = require("../model/Productschema");

const creat=(req,resp)=>{
    const newProduct = new Product({
        name: req.body.name,
        description: req.body.description,
        unitPrice: req.body.unitPrice,
        qtyonhand:req.body.qtyonhand
      });
      newcustomer
        .save()
        .then((result) => {
          resp.status(201).json({ message: "create product succesfull" });
        })
        .catch((err) => {
          resp.status(500).json({ error: err });
        });
}


const findbyid=(req,resp)=>{
    Product.findOne({ _id: req.params.id })
    .then((selecedProduct) => {
      resp.status(201).json({ data: selecedProduct });
    })
    .catch((error) => {
      resp.status(500).json({ error: err });
    });
}


const update= async(req,resp)=>{
    const updateProduct = await Product.findOneAndUpdate({'_id':req.params.id},{
        $set:{
            name: req.body.name,
            description: req.body.description,
            unitPrice: req.body.unitPrice,
            qtyonhand:req.body.qtyonhand
        }
    }, { new: true })
    if(updateProduct){
        resp.status(200).json({"message":"update Product"});
    }else{
        resp.status(500).json({"error":"not update Product"});

    }
    
}


const deletebyid=(req,resp)=>{
    const deleteProduct = Product.findOneAndDelete({'_id':req.params.id});
    if(deleteProduct){
        resp.status(204).json({"message":"delete Product"});
    }else{
        resp.status(500).json({"error":"not delete Product"});

    }
}

const findAll=(req,resp)=>{
    try {
        const { searchtext, page = 1, size = 10 } = req.query;
    
        const pageNumber = parseInt(page);
        const pageSize = parseInt(size);
        const query = {};
        if (searchtext) {
          query.$text = { $search: searchtext };
        }
        const skip = (pageNumber - 1) * pageSize;
    
        const data = Product.find(query).limit(pageSize).skip(skip);
        return resp.status(200).json(data);
      } catch (error) {
        resp.status(500).json({ error: error });
      }
}

module.exports={
    creat,
    update,
    findbyid,
    deletebyid,
    findAll
}