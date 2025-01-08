const mongoose = require("mongoose");

const challengeFieldSchema = new mongoose.Schema(
  {
    challenge: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Challenge",
      required: true,
    },
    field: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Field",
      required: true,
    },
    subFields: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubField",
      },
    ],
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

challengeFieldSchema.add({ deleted_at: Date });

const ChallengeField = mongoose.model("ChallengeField", challengeFieldSchema);

module.exports = ChallengeField;
