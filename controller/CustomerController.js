const Customer = require("../model/Customerschema");

const creat = (req, resp) => {
  const newcustomer = new Customer({
    name: req.body.name,
    address: req.body.address,
    salary: req.body.salary,
  });
  newcustomer
    .save()
    .then((result) => {
      resp.status(201).json({ message: "create succesfull" });
    })
    .catch((err) => {
      resp.status(500).json({ error: err });
    });
};

const findbyid = (req, resp) => {

  Customer.findOne({ _id: req.query.id })
    .then((selecedCustomer) => {
      resp.status(201).json(selecedCustomer);

    })
    .catch((error) => {
      resp.status(500).json({ error: err });
    });
};

const update = async (req, resp) => {
  console.log(req.query.id);
  const updatecustomer = await Customer.findOneAndUpdate(
    { _id: req.query.id },
    {
      $set: {
        name: req.body.name,
        address: req.body.address,
        salary: req.body.salary,
      },
    },
    { new: true }
  );
  if (updatecustomer) {
    resp.status(200).json({ message: "update customer" });
  } else {
    resp.status(500).json({ error: "not update customer" });
  }
};

const deletebyid = async (req, resp) => {
  try {

    const deletecustomer = await Customer.findOneAndDelete({ _id: req.query.id });

    if (deletecustomer) {
      resp.status(206).json({ message: "Deleted customer" });
    } else {
      resp.status(404).json({ error: "Customer not found" });
    }
  } catch (error) {
    console.error(error);
    resp.status(500).json({ error: "Internal server error" });
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

    Customer.find(query)
      .limit(pageSize)
      .skip(skip)
      .then((data) => {
        return resp.status(200).json(data);
      })
      .catch((e) => {
        resp.status(500).json({ error: e });
      });
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
