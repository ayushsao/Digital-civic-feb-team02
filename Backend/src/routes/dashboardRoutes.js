const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { isCitizen, isOfficial } = require("../middleware/roleMiddleware");


router.get("/citizen", protect, isCitizen, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to Citizen Dashboard",
    user: req.user,
  });
});


router.get("/official", protect, isOfficial, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to Official Dashboard",
    user: req.user,
  });
});

module.exports = router;
