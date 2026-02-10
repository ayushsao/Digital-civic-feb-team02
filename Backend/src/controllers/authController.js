const User = require("../models/User");
const { sendTokenResponse } = require("../utils/jwt");

// ---------------------------------------------------------
// @desc    Register a new user
// @route   POST /api/auth/register
// ---------------------------------------------------------
const register = async (req, res, next) => {
  try {
    const { name, email, password, role, location } = req.body;

    // --- Validate required fields ---
    if (!name || !email || !password || !location) {
      return res.status(400).json({
        success: false,
        message: "Please provide name, email, password, and location",
      });
    }

    // --- Validate role ---
    if (role && !["citizen", "official"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Role must be either citizen or official",
      });
    }

    // --- Check if user already exists ---
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists",
      });
    }

    // --- Create user ---
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password,
      role: role || "citizen",
      location,
    });

    // --- Send JWT token response ---
    sendTokenResponse(user, 201, res);
  } catch (error) {
    next(error);
  }
};

// ---------------------------------------------------------
// @desc    Login user
// @route   POST /api/auth/login
// ---------------------------------------------------------
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // --- Validate required fields ---
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    // --- Find user and include password for comparison ---
    const user = await User.findOne({ email: email.toLowerCase() }).select(
      "+password"
    );

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // --- Compare password ---
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // --- Send JWT token response ---
    sendTokenResponse(user, 200, res);
  } catch (error) {
    next(error);
  }
};


// @desc    Get current logged-in user
// @route   GET /api/auth/me

// ---------------------------------------------------------
const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

// ---------------------------------------------------------
// @desc    Logout user (clear cookie)
// @route   POST /api/auth/logout
// ---------------------------------------------------------
const logout = async (req, res, next) => {
  try {
    res
      .status(200)
      .cookie("token", "none", {
        httpOnly: true,
        expires: new Date(0),
      })
      .json({
        success: true,
        message: "Logged out successfully",
      });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, getMe, logout };
