const Order = require("../model/Orderschema");

const creat = (req, resp) => {
  const newOrder = new Order({
    date: req.body.date,
    customerdetails: req.body.customerdetails,
    totalcost: req.body.totalcost,
    products: req.body.products,
  });
  newOrder
    .save()
    .then((result) => {
      resp.status(201).json({ message: "create order succesfull" });
    })
    .catch((err) => {
      resp.status(500).json({ error: err });
    });
};

const findbyid = (req, resp) => {
  Order.findOne({ _id: req.params.id })
    .then((selecedOrder) => {
      resp.status(201).json({ data: selecedOrder });
    })
    .catch((error) => {
      resp.status(500).json({ error: err });
    });
};

const update = async (req, resp) => {
  const updateOrder = await Order.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        date: req.body.date,
        customerdetails: req.body.customerdetails,
        totalcost: req.body.totalcost,
        products: req.body.products,
      },
    },
    { new: true }
  );
  if (updateOrder) {
    resp.status(200).json({ message: "update Order" });
  } else {
    resp.status(500).json({ error: "not update Order" });
  }
};

const deletebyid = (req, resp) => {
    const deleteOrder = Order.findOneAndDelete({'_id':req.params.id});
    if(deleteOrder){
        resp.status(204).json({"message":"delete Order"});
    }else{
        resp.status(500).json({"error":"not delete Order"});

    }
};

const findAll = (req, resp) => {
    try {
        const { searchtext, page = 1, size = 10 } = req.query;
    
        const pageNumber = parseInt(page);
        const pageSize = parseInt(size);
        const query = {};
        if (searchtext) {
          query.$text = { $search: searchtext };
        }
        const skip = (pageNumber - 1) * pageSize;
    
        const data = Order.find(query).limit(pageSize).skip(skip);
        return resp.status(200).json(data);
      } catch (error) {
        resp.status(500).json({ error: error });
      }
};

module.exports = {
  creat,
  update,
  findbyid,
  deletebyid,
  findAll,
};
