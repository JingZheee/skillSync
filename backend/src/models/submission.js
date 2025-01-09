const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema(
  {
    challenge: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Challenge",
      required: true,
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
    submittedFiles: [
      {
        filename: String,
        originalName: String,
        path: String,
        size: Number,
        mimetype: String,
      },
    ],
    notes: String,
    rating: {
      overall: {
        type: Number,
        min: 1,
        max: 5,
      },
      codeQuality: {
        type: Number,
        min: 1,
        max: 5,
      },
      apiDocumentation: {
        type: Number,
        min: 1,
        max: 5,
      },
      errorHandling: {
        type: Number,
        min: 1,
        max: 5,
      },
      security: {
        type: Number,
        min: 1,
        max: 5,
      },
    },
    feedback: String,
    reviewedAt: { type: Date },
    submittedAt: { type: Date, default: Date.now },
    deleted_at: Date,
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const Submission = mongoose.model("Submission", submissionSchema);

module.exports = Submission;
