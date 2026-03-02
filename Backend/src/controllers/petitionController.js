const Petition = require("../models/Petition");
const User = require("../models/User");
const Signature = require("../models/Signature");


const createPetition = async (req, res, next) => {
  try {
    const { title, description, category, location } = req.body;
    const userId = req.user._id;

    if (!title || !description || !category || !location) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields: title, description, category, and location",
      });
    }

    const petition = await Petition.create({
      title,
      description,
      category,
      location,
      creator: userId,
    });

    const populated = await Petition.findById(petition._id).populate("creator", "name email role location");

    res.status(201).json({
      success: true,
      message: "Petition created successfully",
      petition: populated,
    });
  } catch (error) {
    next(error);
  }
};


const getAllPetitions = async (req, res, next) => {
  try {
    const { location, category, status, page = 1, limit = 10 } = req.query;

    const filter = {};
    
    // Apply filters based on query parameters
    if (category) filter.category = category;
    if (status) filter.status = status;
    
    // Location-based filtering
    if (location) {
      filter.location = location;
    } else if (req.user && req.user.role === "official") {
      // Officials can only view petitions in their location
      filter.location = req.user.location;
    }
    // Citizens can view all petitions (no location filter unless specified)

    // Pagination
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    const petitions = await Petition.find(filter)
      .populate("creator", "name email role location")
      .sort({ createdAt: -1 })
      .limit(limitNum)
      .skip(skip);

    const totalPetitions = await Petition.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: petitions.length,
      total: totalPetitions,
      page: pageNum,
      pages: Math.ceil(totalPetitions / limitNum),
      petitions,
    });
  } catch (error) {
    next(error);
  }
};


const getPetitionById = async (req, res, next) => {
  try {
    const petition = await Petition.findById(req.params.id)
      .populate("creator", "name email role location");

    if (!petition) {
      return res.status(404).json({
        success: false,
        message: "Petition not found",
      });
    }

    // Get accurate signature count from Signature collection
    const signatureCount = await Signature.countDocuments({
      petition: req.params.id,
    });

    res.status(200).json({
      success: true,
      petition: {
        ...petition.toObject(),
        signatureCount,
      },
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(404).json({
        success: false,
        message: "Petition not found",
      });
    }
    next(error);
  }
};


const signPetition = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const petitionId = req.params.id;

  
    const petition = await Petition.findById(petitionId);

    if (!petition) {
      return res.status(404).json({
        success: false,
        message: "Petition not found",
      });
    }

    
    if (petition.status !== "active") {
      return res.status(400).json({
        success: false,
        message: "This petition is not accepting signatures",
      });
    }

    // Check if user already signed using Signature model
    const existingSignature = await Signature.findOne({
      petition: petitionId,
      user: userId,
    });

    if (existingSignature) {
      return res.status(400).json({
        success: false,
        message: "You have already signed this petition",
      });
    }


    // Create new signature (Signature model is the single source of truth)
    const signature = await Signature.create({
      petition: petitionId,
      user: userId,
    });

    // Update the cached signatureCount on the petition
    const signatureCount = await Signature.countDocuments({ petition: petitionId });
    await Petition.findByIdAndUpdate(petitionId, { signatureCount });

    res.status(200).json({
      success: true,
      message: "Petition signed successfully",
      signatureCount,
      signature,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(404).json({
        success: false,
        message: "Petition not found",
      });
    }
    
    // Handle duplicate key error from unique index
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "You have already signed this petition",
      });
    }
    
    next(error);
  }
};

// Get all signatures for a specific petition
const getPetitionSignatures = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { page = 1, limit = 20 } = req.query;

    // Check if petition exists
    const petition = await Petition.findById(id);
    if (!petition) {
      return res.status(404).json({
        success: false,
        message: "Petition not found",
      });
    }

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    const signatures = await Signature.find({ petition: id })
      .populate("user", "name email location")
      .sort({ createdAt: -1 })
      .limit(limitNum)
      .skip(skip);

    const totalSignatures = await Signature.countDocuments({ petition: id });

    res.status(200).json({
      success: true,
      count: signatures.length,
      total: totalSignatures,
      page: pageNum,
      pages: Math.ceil(totalSignatures / limitNum),
      signatures,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(404).json({
        success: false,
        message: "Petition not found",
      });
    }
    next(error);
  }
};

// Get petition statistics
const getPetitionStats = async (req, res, next) => {
  try {
    const filter = {};

    // Officials can only see stats for their location
    if (req.user && req.user.role === "official") {
      filter.location = req.user.location;
    }

    const totalPetitions = await Petition.countDocuments(filter);
    const activePetitions = await Petition.countDocuments({ ...filter, status: "active" });
    const underReviewPetitions = await Petition.countDocuments({ ...filter, status: "under_review" });
    const closedPetitions = await Petition.countDocuments({ ...filter, status: "closed" });

    // Get petitions by category
    const petitionsByCategory = await Petition.aggregate([
      { $match: filter },
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    // Get petitions by location (only for citizens or no filter)
    let petitionsByLocation = [];
    if (!req.user || req.user.role === "citizen") {
      petitionsByLocation = await Petition.aggregate([
        { $group: { _id: "$location", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 10 },
      ]);
    }

    // Get total signatures
    let totalSignatures = 0;
    if (Object.keys(filter).length === 0) {
      totalSignatures = await Signature.countDocuments();
    } else {
      const petitionIds = await Petition.find(filter).distinct("_id");
      totalSignatures = await Signature.countDocuments({ petition: { $in: petitionIds } });
    }

    res.status(200).json({
      success: true,
      stats: {
        totalPetitions,
        activePetitions,
        underReviewPetitions,
        closedPetitions,
        totalSignatures,
        petitionsByCategory,
        petitionsByLocation,
      },
    });
  } catch (error) {
    next(error);
  }
};

// PATCH /api/petitions/:id/status  — Officials only
const updatePetitionStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const validStatuses = ["active", "under_review", "closed"];

    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Status must be one of: ${validStatuses.join(", ")}`
      });
    }

    const petition = await Petition.findById(req.params.id);
    if (!petition) {
      return res.status(404).json({ success: false, message: "Petition not found" });
    }

    // Officials can only manage petitions in their own location
    if (req.user.role === "official" && petition.location !== req.user.location) {
      return res.status(403).json({
        success: false,
        message: "You can only manage petitions in your location"
      });
    }

    petition.status = status;
    await petition.save();

    const updated = await Petition.findById(petition._id).populate("creator", "name email role location");

    res.status(200).json({
      success: true,
      message: `Petition status updated to "${status}"`,
      petition: updated,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(404).json({ success: false, message: "Petition not found" });
    }
    next(error);
  }
};

// GET /api/petitions/mine  — Citizens: their own created petitions
const getMyPetitions = async (req, res, next) => {
  try {
    // Hard guard: req.user._id must exist (protect middleware guarantees this,
    // but Mongoose silently drops undefined from queries returning ALL docs)
    if (!req.user || !req.user._id) {
      return res.status(401).json({ success: false, message: "Not authenticated" });
    }

    const petitions = await Petition.find({ creator: req.user._id })
      .sort({ createdAt: -1 });

    // Attach live signature counts
    const enriched = await Promise.all(
      petitions.map(async (p) => {
        const signatureCount = await Signature.countDocuments({ petition: p._id });
        return { ...p.toObject(), signatureCount };
      })
    );

    res.status(200).json({ success: true, count: enriched.length, petitions: enriched });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createPetition,
  getAllPetitions,
  getPetitionById,
  signPetition,
  getPetitionSignatures,
  getPetitionStats,
  updatePetitionStatus,
  getMyPetitions,
};
