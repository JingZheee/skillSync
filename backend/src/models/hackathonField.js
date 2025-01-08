const mongoose = require("mongoose");

const hackathonFieldSchema = new mongoose.Schema(
  {
    hackathon: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hackathon",
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

hackathonFieldSchema.add({ deleted_at: Date });

const HackathonField = mongoose.model("HackathonField", hackathonFieldSchema);

module.exports = HackathonField;
