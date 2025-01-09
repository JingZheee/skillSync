const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    phone: { type: String },
    field: {
      main: { type: mongoose.Schema.Types.ObjectId, ref: "Field" },
      sub: [{ type: mongoose.Schema.Types.ObjectId, ref: "SubField" }],
    },
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
    ranking: { type: mongoose.Schema.Types.ObjectId, ref: "Ranking" },
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
    challenges: [{ type: mongoose.Schema.Types.ObjectId, ref: "Challenge" }],
    submissions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Submission" }],
    hackathons: [{ type: mongoose.Schema.Types.ObjectId, ref: "Hackathon" }],
    deleted_at: Date,
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
