// generateTokenAndSetCookie.js
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const generateTokenAndSetCookie = (userId, res) => {
  // Generate the JWT with only necessary user details
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '15d', // Set expiration time
  });

  // Set the token in the cookie
  res.cookie('jwt', token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // Convert to milliseconds
    httpOnly: true,  // Protect from XSS attacks
    sameSite: 'Strict', // Prevent CSRF attacks
  });

  return token;
};

module.exports = generateTokenAndSetCookie;
