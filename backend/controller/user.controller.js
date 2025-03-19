// user.controller.js
const User = require("../models/user.models");

exports.getUserSidebar = async (req, res) => {
  try {
    // The logged-in user's ID is attached to the req object by the middleware
    const loggedId = req.user;
    
    // Find all users except the logged-in user
    const allUser = await User.find({
      _id: { $ne: loggedId },
    });

    if (allUser.length === 0) {  // If no users found
      return res.status(404).json({ message: "No other users found" });
    }
    
    res.json(allUser);  // Send the list of users as the response
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
