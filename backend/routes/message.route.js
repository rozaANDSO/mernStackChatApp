const { sendMessage, getMessages } = require("../controller/message.controller");
const protectRoute = require("../middleware/protectedRoute");
console.log("sendMessage:", typeof sendMessage); // Should log 'function'
console.log("protectRoute:", typeof protectRoute); // Should log 'function'
const express = require("express");
const router = express.Router();
router.get("/", protectRoute ,getMessages)
router.post("/send/:id", protectRoute, sendMessage);
module.exports = router;
