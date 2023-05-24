const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/config");
const User = require("../models/user");

exports.authenticate = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, jwtSecret);
    const user = await User.findById(decoded.id);
    if (!user) throw new Error();
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" });
  }
};