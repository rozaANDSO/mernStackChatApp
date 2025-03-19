const jwt = require('jsonwebtoken');
const User = require('../models/user.models');

const protectRoute = async (req, res, next) => {
  try {
    // Get token from cookies
    const token = req.cookies.jwt;

    // If no token is found in cookies, return a clear error message
    if (!token) {
      return res.status(401).json({ message: 'Token not found. Please login.' });
    }

    let decoded;
    try {
      // Verify the token using JWT secret
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      console.error('JWT Verification Error:', err);
      return res.status(401).json({ message: 'Token is invalid or expired.' });
    }

    // If token decoding fails, return error
    if (!decoded) {
      return res.status(401).json({ message: 'Token decoding failed.' });
    }

    // Look up the user based on the userId in the decoded token
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Attach the user to the request object for access in further middleware/route handlers
    req.user = user;
    next(); // Allow the request to proceed to the next middleware/route

  } catch (err) {
    console.error('Protection Middleware Error:', err.message);
    return res.status(401).json({ message: 'Not authorized, token failed.' });
  }
};

module.exports = protectRoute;
