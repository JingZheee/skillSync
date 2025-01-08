const mongoose = require("mongoose");

const challengeTagSchema = new mongoose.Schema(
  {
    challengeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MiniChallenge",
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

challengeTagSchema.add({ deleted_at: Date });

const ChallengeTag = mongoose.model("ChallengeTag", challengeTagSchema);

module.exports = ChallengeTag;
