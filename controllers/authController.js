const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { jwtSecret, jwtExpiration } = require("../config/config");

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();
    const token = jwt.sign({ id: user._id }, jwtSecret, {
      expiresIn: jwtExpiration,
    });
    res.status(201).json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });
    const token = jwt.sign({ id: user._id }, jwtSecret, {
      expiresIn: jwtExpiration,
    });
    res.status(200).json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error" });
  }
};