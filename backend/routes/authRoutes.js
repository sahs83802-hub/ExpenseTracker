// backend/routes/authRoutes.js
const express = require("express");
const {
  registerUser,
  loginUser,
  getUserInfo,
} = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// support both /register and /signup
router.post("/register", registerUser);
router.post("/signup", registerUser);

router.post("/login", loginUser);

router.get("/getUser", protect, getUserInfo);

module.exports = router;
