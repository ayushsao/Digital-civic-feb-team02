const jwt = require("jsonwebtoken");
const User = require("../models/User");


const protect = async (req, res, next) => {
  try {
    let token;

   
    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    
    if (
      !token &&
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

   
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized. No token provided.",
      });
    }


    const decoded = jwt.verify(token, process.env.JWT_SECRET);


    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User belonging to this token no longer exists.",
      });
    }

  
    req.user = {
      _id: user._id,
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
      location: user.location,
      isVerified: user.isVerified,
    };
    next();
  } catch (error) {
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      return res.status(401).json({
        success: false,
        message:
          error.name === "TokenExpiredError"
            ? "Token expired. Please log in again."
            : "Invalid token. Please log in again.",
      });
    }
    next(error);
  }
};

/**
 * Optional authentication middleware.
 * Populates req.user if a valid token is present but does NOT
 * reject the request when the token is missing or invalid.
 * Use on public routes where behaviour changes per role
 * (e.g. officials see only their location's petitions).
 */
const optionalAuth = async (req, res, next) => {
  try {
    let token;

    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    if (
      !token &&
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) return next(); // No token — continue as anonymous

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (user) {
      req.user = {
        _id: user._id,
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        location: user.location,
        isVerified: user.isVerified,
      };
    }

    next();
  } catch {
    // Token invalid/expired — continue as anonymous
    next();
  }
};

module.exports = { protect, optionalAuth };
