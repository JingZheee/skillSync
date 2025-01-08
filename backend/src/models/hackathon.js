const mongoose = require("mongoose");

const hackathonSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    reward: { type: String },
    dueDate: { type: Date },
    maxParticipants: { type: Number },
    registrationStartDate: { type: Date },
    registrationEndDate: { type: Date },
    timeline: { type: String },
    coverUrl: { type: String },
    createdDate: { type: Date, default: Date.now },
    uploadedFile: { type: String },
    company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

hackathonSchema.virtual("tags", {
  ref: "ChallengeTag",
  localField: "_id",
  foreignField: "hackathonId",
  justOne: false,
  populate: { path: "tag" },
});

hackathonSchema.add({ deleted_at: Date });

const Hackathon = mongoose.model("Hackathon", hackathonSchema);

module.exports = Hackathon;
