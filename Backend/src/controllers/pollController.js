const Poll = require("../models/Poll");
const Vote = require("../models/Vote");
const mongoose = require("mongoose");

// CREATE POLLS:-

exports.createPoll = async (req, res) => {

  try {

    if (req.user.role !== "official") {
      return res.status(403).json({
        message: "Only officials can create polls"
      });
    }

    const { title, options, targetLocation } = req.body;

    if (!title || !options || options.length < 2) {
      return res.status(400).json({
        message: "Poll must have title and at least 2 options"
      });
    }
    const cleanOptions = options.map(option =>option.trim());

    const poll = await Poll.create({
      title: title.trim(),
      options: cleanOptions,
      createdBy: req.user._id,
      targetLocation
    });

    console.log(`Poll created by user ${req.user._id} for location ${targetLocation}`);

    res.status(201).json(poll);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

};

//GET POLLS:-

exports.getPolls = async (req, res) => {

  try {

    const filter = {};

    if (req.user.role === "citizen") {
      filter.targetLocation = req.user.location;
    }

    const polls = await Poll.find(filter).sort({ createdAt: -1 });
    
    console.log(`Polls fetched for role: ${req.user.role}, location: ${req.user.location}`);

    res.json(polls);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

};

// POLL BY ID:-

exports.getPollById = async (req, res) => {

  try {

    const pollId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(pollId)) {
    return res.status(400).json({
    message: "Invalid poll ID"
    });
    }

    const poll = await Poll.findById(pollId);

    if (!poll) {
      return res.status(404).json({ message: "Poll not found" });
    }

    const votes = await Vote.aggregate([
      { $match: { poll: new mongoose.Types.ObjectId(pollId) } },

      {
        $group: {
          _id: "$selectedOption",
          count: { $sum: 1 }
        }
      }
    ]);

    const totalVotes = votes.reduce((sum, v) => sum + v.count, 0);

     const results = poll.options.map(option => {
        const vote = votes.find(v => v._id === option);

        const count = vote ? vote.count : 0;

        return {
        option,
        count,
        percentage: totalVotes
        ? ((count / totalVotes) * 100).toFixed(2)
        : 0
      };
      });

    res.json({
      poll,
      totalVotes,
      results
    });

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

};

// VOTING API:-

exports.votePoll = async (req, res) => {
  try {

    if (req.user.role !== "citizen") {
      return res.status(403).json({
        message: "Only citizens can vote"
      });
    }

    const pollId = req.params.id;
    const selectedOption = req.body.selectedOption?.trim();

    if (!selectedOption) {
       return res.status(400).json({
         message: "Option is required"
      });
    }

    if (!mongoose.Types.ObjectId.isValid(pollId)) {
      return res.status(400).json({
        message: "Invalid poll ID"
      });
    }

    const poll = await Poll.findById(pollId);

    if (!poll) {
      return res.status(404).json({
        message: "Poll not found"
      });
    }

    if (!poll.options.includes(selectedOption)) {
      return res.status(400).json({
        message: "Invalid option"
      });
    }

    const vote = await Vote.create({
      poll: pollId,
      user: req.user._id,
      selectedOption
    });

    console.log(`User ${req.user._id} voted "${selectedOption}" on poll ${pollId}`);

    res.json({
      success: true,
      message: "Vote recorded",
      vote
    });

  } catch (error) {

    if (error.code === 11000) {
      return res.status(400).json({
        message: "You already voted"
      });
    }

    res.status(500).json({
      message: error.message
    });
  }
};