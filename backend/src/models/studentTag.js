const mongoose = require("mongoose");

const studentTagSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
    tag: { type: mongoose.Schema.Types.ObjectId, ref: "Tag" },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

studentTagSchema.add({ deleted_at: Date });

const StudentTag = mongoose.model("StudentTag", studentTagSchema);

module.exports = StudentTag;
