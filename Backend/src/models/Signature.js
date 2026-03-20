const mongoose = require("mongoose");

const signatureSchema = new mongoose.Schema(
  {
    petition: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Petition",
      required: [true, "Petition reference is required"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User reference is required"],
    },
  },
  {
    timestamps: true, // This automatically adds createdAt and updatedAt
  }
);

// Compound unique index to prevent duplicate signatures
signatureSchema.index({ petition: 1, user: 1 }, { unique: true });

// Index for efficient querying
signatureSchema.index({ petition: 1 });
signatureSchema.index({ user: 1 });

const Signature = mongoose.model("Signature", signatureSchema);

module.exports = Signature;
