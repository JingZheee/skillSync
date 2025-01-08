const mongoose = require("mongoose");

const hackathonTagSchema = new mongoose.Schema(
  {
    hackathonId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hackathon",
      required: true,
    },
    tag: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tag",
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

hackathonTagSchema.add({ deleted_at: Date });

const HackathonTag = mongoose.model("HackathonTag", hackathonTagSchema);

module.exports = HackathonTag;
