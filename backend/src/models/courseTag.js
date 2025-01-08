const mongoose = require("mongoose");

const courseTagSchema = new mongoose.Schema(
  {
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
    tag: { type: mongoose.Schema.Types.ObjectId, ref: "Tag" },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

courseTagSchema.add({ deleted_at: Date });

const CourseTag = mongoose.model("CourseTag", courseTagSchema);

module.exports = CourseTag;
