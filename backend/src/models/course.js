const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

courseSchema.add({ deleted_at: Date });

courseSchema.virtual("tags", {
  ref: "CourseTag",
  localField: "_id",
  foreignField: "course",
  justOne: false,
  populate: { path: "tag" },
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
