const mongoose = require("mongoose");

const studentChallengeSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
    miniChallenge: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MiniChallenge",
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
    submittedDate: { type: Date },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

studentChallengeSchema.add({ deleted_at: Date });

const StudentChallenge = mongoose.model(
  "StudentChallenge",
  studentChallengeSchema
);

module.exports = StudentChallenge;
