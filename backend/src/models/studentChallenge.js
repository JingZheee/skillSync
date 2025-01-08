const mongoose = require("mongoose");

const studentChallengeSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
    challenge: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Challenge",
    },
    status: {
      type: String,
      enum: ["Not Started", "In Progress", "Completed"],
      default: "Not Started",
    },
    startedAt: { type: Date },
    completedAt: { type: Date },
    submissions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Submission" }],
    deleted_at: Date,
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const StudentChallenge = mongoose.model(
  "StudentChallenge",
  studentChallengeSchema
);

module.exports = StudentChallenge;
