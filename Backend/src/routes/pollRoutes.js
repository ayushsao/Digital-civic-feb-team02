const express = require("express");
const router = express.Router();

const pollController = require("../controllers/pollController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, pollController.createPoll);

router.get("/", protect, pollController.getPolls);

router.get("/:id", protect, pollController.getPollById);

router.post("/:id/vote", protect, pollController.votePoll);

module.exports = router;