const express = require("express");
const User = require("../models/user.models");
const generateTokenAndSetCookie = require("../utils/generalToken"); // Correct import

exports.signUp = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, email, gender } =
      req.body;

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    // Check if username already exists
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ error: "Username is already taken" });
    }

    // Check if email already exists
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ error: "Email is already taken" });
    }

    // Set profile pic based on gender
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    // Create new user
    const newUser = new User({
      fullName,
      username,
      password,
      email,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    // Save user to the database
    await newUser.save();
    // Generate token and set cookie
    generateTokenAndSetCookie(newUser, res);
    // Respond with success message
    res.status(201).json({
      message: "User registered successfully",
      user: newUser,
    });
  } catch (err) {
    console.error("Error during sign up:", err.message);
    console.error("Stack trace:", err.stack);

    // Check for specific errors and send custom response
    if (err.name === "ValidationError") {
      return res.status(400).json({ error: "Invalid data format" });
    }

    // Handle any other errors (database, token generation, etc.)
    res.status(500).json({ error: "Server error: Please try again later" });
  }
};
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Pass both `user` and `res` to the function
    generateTokenAndSetCookie(user, res);

    res.json({ message: "User logged in successfully", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.logout = (req, res) => {
  try {
    res.clearCookie("token");
    res.json({ message: "User logged out successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
