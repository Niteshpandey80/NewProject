const jwt = require('jsonwebtoken');
const User = require("../models/User");

const middleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "Unauthorized: No token" });
    }

    const token = authHeader.split(" ")[1];
    if (!token || token === "null") {
      return res.status(401).json({ success: false, message: "Unauthorized: Invalid token" });
    }

    const decoded = jwt.verify(token, 'secretkeynoteapp12#');
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    const newUser = {name:user.name , id:user._id}
    req.user = newUser
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Please login first" });
  }
};

module.exports = middleware;
