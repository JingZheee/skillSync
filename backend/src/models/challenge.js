const mongoose = require("mongoose");

const challengeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    difficulty: { type: String, enum: ["easy", "medium", "hard"] },
    dueDate: { type: Date },
    createdDate: { type: Date, default: Date.now },
    uploadedFile: { type: String },
    company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
    hackathon: { type: mongoose.Schema.Types.ObjectId, ref: "Hackathon" },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

challengeSchema.virtual("tags", {
  ref: "ChallengeTag",
  localField: "_id",
  foreignField: "challengeId",
  justOne: false,
  populate: { path: "tag" },
});

challengeSchema.add({ deleted_at: Date });

const MiniChallenge = mongoose.model("MiniChallenge", challengeSchema);

module.exports = MiniChallenge;
