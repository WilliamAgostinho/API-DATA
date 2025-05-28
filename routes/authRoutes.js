const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const loginLimit = require("../middleware/rateLimiter");

router.post("/login", loginLimit, authController.login);

router.post("/register", authController.register);

module.exports = router;
