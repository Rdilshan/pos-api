const User = require("../model/Userschema");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const jsonwebtoken = require("jsonwebtoken");
const salt = 10;

const Registation = (req, resp) => {
  bcrypt.hash(req.body.password, salt, function (err, hash) {
    if (err) {
      resp.status(500).json(err);
    }
    const newuser = new User({
      fullName: req.body.fullName,
      email: req.body.email,
      password: hash,
      activeState: req.body.activeState,
    });
    newuser
      .save()
      .then(() => {
        // mail sand
        const transpoter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "rd118755@gmail.com",
            pass: "klau dmdw todl wrlw",
          },
        });

        const mailoption = {
          from: "rd118755@gmail.com",
          to: req.body.email,
          subject: "New account Create!",
          text: "account craete successfull !",
        };

        transpoter.sendMail(mailoption, function (err, info) {
          if (err) {
            resp.status(500).json(err);
          } else {
            resp.status(201).json({ message: info });
          }
        });
        resp.status(201).json({ message: "saved!" });
      })
      .catch((err) => {
        resp.status(500).json(err);
      });
  });
};

const Login = (req, resp) => {
  User.findOne({ 'email': req.body.email }).then((result) => {
    if (result == null) {
      resp.status(404).json({ message: "email not fund" });
    } else {
   
      bcrypt.compare(req.body.password,result.password,function (err, info) {
        if (err) {
          resp.status(404).json({ message: err });
        } 
        if(info) {
          const payload = {
            email: req.body.email,
          };
          const securtkry = process.env.SECRIT_KEY;
          const expiresIn = '24h';

          const token = jsonwebtoken.sign(payload, securtkry, { expiresIn: expiresIn });
          resp.status(200).json({
            'token': token,
            'msg':'login successful'
          });
        }else{
          resp.status(404).json({ message: "password incorrect" });
        }
      });
    }
  });
};


module.exports = {
  Registation,
  Login,
};
