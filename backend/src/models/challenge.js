const mongoose = require("mongoose");

const challengeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    difficulty: { type: String, enum: ["easy", "medium", "hard"] },
    timeEstimate: { type: Number },
    learningObjective: { type: [String] },
    challengeFiles: [
      {
        filename: { type: String, required: true },
        path: { type: String, required: true },
      },
    ],
    stepToStepInstructions: { type: [String] },
    additionalResources: {
      type: Map,
      of: {
        title: String,
        url: String,
      },
    },
    submissionGuidelines: { type: [String] },
    evaluationCriteria: { type: [String] },
    createdDate: { type: Date, default: Date.now },
    uploadedFile: { type: String },
    field: { type: mongoose.Schema.Types.ObjectId, ref: "Field" },
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
