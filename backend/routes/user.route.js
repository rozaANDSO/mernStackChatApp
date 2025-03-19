// user.route.js
const express = require("express");
const { getUserSidebar } = require("../controller/user.controller");
const protectedRoute = require("../middleware/protectedRoute");

const router = express.Router();

// Protected route: it ensures that the user is authenticated before getting the sidebar
router.get("/", protectedRoute, getUserSidebar);

module.exports = router;
