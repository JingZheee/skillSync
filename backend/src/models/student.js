const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String },
    email: { type: String, unique: true, required: true },
    university: { type: String },
    password: { type: String, required: true },
    field: { type: mongoose.Schema.Types.ObjectId, ref: "Field" },
    rank: { type: mongoose.Schema.Types.ObjectId, ref: "Ranking" },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

studentSchema.add({ deleted_at: Date });

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
