const mongoose = require("mongoose");

const studentFieldSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
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

studentFieldSchema.add({ deleted_at: Date });

const StudentField = mongoose.model("StudentField", studentFieldSchema);

module.exports = StudentField;
