const express = require("express");
const router = express.Router();

const {
  createPetition,
  getAllPetitions,
  getPetitionById,
  signPetition,
  getPetitionSignatures,
  getPetitionStats,
  updatePetitionStatus,
  getMyPetitions,
} = require("../controllers/petitionController");

const { protect, optionalAuth } = require("../middleware/authMiddleware");
const { isCitizen, isOfficial } = require("../middleware/roleMiddleware");

// Public routes
router.get("/", optionalAuth, getAllPetitions);
router.get("/stats", optionalAuth, getPetitionStats);

// Citizen-only routes (must be before /:id to avoid being swallowed by that pattern)
router.get("/user/mine", protect, isCitizen, getMyPetitions);
router.post("/", protect, isCitizen, createPetition);

// Routes with :id param
router.get("/:id", getPetitionById);
router.get("/:id/signatures", getPetitionSignatures);
router.post("/:id/sign", protect, isCitizen, signPetition);

// Official-only routes
router.patch("/:id/status", protect, isOfficial, updatePetitionStatus);

module.exports = router;
