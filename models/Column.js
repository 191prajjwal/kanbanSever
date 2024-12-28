const mongoose = require("mongoose");

const columnSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    boardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Board", 
      required: false,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Column", columnSchema);
