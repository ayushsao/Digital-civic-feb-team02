const mongoose = require("mongoose");

const pollSchema = new mongoose.Schema(
{
  title: {
    type: String,
    required: true,
    trim: true
  },

  options: {
    type: [String],
    required: true,
    validate: {
      validator: function(v) {
        return v.length >= 2;
      },
      message: "Poll must have at least 2 options"
    }
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  targetLocation: {
    type: String,
    required: true
  }

},
{ timestamps: true }
);

module.exports = mongoose.model("Poll", pollSchema);