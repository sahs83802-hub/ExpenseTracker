// backend/controllers/authController.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// POST /api/auth/register or /api/auth/signup
const registerUser = async (req, res) => {
  try {
    // accept both: name OR fullName from frontend
    const rawName = req.body.name || req.body.fullName || req.body.fullname;
    const email = req.body.email;
    const password = req.body.password;
    const avatarUrl = req.body.avatarUrl || "";

    if (!rawName || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Name, email and password are required" });
    }

    const name = rawName.trim();

    const exists = await User.findOne({ email });
    if (exists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const user = await User.create({
      name,
      email,
      password,
      avatarUrl,
    });

    const token = generateToken(user._id);

    // ✅ response shape that most frontends expect
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatarUrl: user.avatarUrl,
      },
    });
  } catch (err) {
    console.error("Register error:", err.message, err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// POST /api/auth/login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    const token = generateToken(user._id);

    return res.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatarUrl: user.avatarUrl,
      },
    });
  } catch (err) {
    console.error("Login error:", err.message, err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// GET /api/auth/getUser
const getUserInfo = async (req, res) => {
  try {
    // protect middleware already put user on req
    return res.json({
      success: true,
      user: req.user,
    });
  } catch (err) {
    console.error("Get user error:", err.message, err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { registerUser, loginUser, getUserInfo };
