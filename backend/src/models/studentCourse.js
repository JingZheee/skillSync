const mongoose = require("mongoose");

const studentCourseSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

studentCourseSchema.add({ deleted_at: Date });

const StudentCourse = mongoose.model("StudentCourse", studentCourseSchema);

module.exports = StudentCourse;
