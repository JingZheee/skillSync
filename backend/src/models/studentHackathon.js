const mongoose = require("mongoose");

const studentHackathonSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
    hackathon: { type: mongoose.Schema.Types.ObjectId, ref: "Hackathon" },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

studentHackathonSchema.add({ deleted_at: Date });

const StudentHackathon = mongoose.model(
  "StudentHackathon",
  studentHackathonSchema
);

module.exports = StudentHackathon;
