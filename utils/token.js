const jwt = require("jsonwebtoken");

exports.generateToken = (userInfo) => {
  const payload = {
    _id: userInfo._id,
    email: userInfo.email,
    role: userInfo.role,
    name: userInfo.name
  };
  const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
    expiresIn: "30days"
  });

  return token;
};