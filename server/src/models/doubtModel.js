const mongoose = require("mongoose");

const doubtSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["open", "resolved"],
    default: "open",
  },
  image: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("Doubt", doubtSchema);
