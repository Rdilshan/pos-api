const jwt = require("jsonwebtoken");
const key = process.env.SECRIT_KEY;

const verifykey = (req, resp, next) => {
  const token = req.headers.authorization;
  if (!token) {
    resp.status(404).json({ message: "token not availbel" });
  } else {
    jwt.verify(token, key, (err, info) => {
      if (err) {
        resp.status(404).json({ message: "token unauthorized" });
      }
      next();
    });
  }
};

module.exports=verifykey;
