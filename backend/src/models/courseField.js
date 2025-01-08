const mongoose = require("mongoose");

const courseFieldSchema = new mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    field: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Field",
      required: true,
    },
    subFields: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubField",
      },
    ],
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

courseFieldSchema.add({ deleted_at: Date });

const CourseField = mongoose.model("CourseField", courseFieldSchema);

module.exports = CourseField;
