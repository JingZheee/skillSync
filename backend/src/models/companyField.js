const mongoose = require("mongoose");

const companyFieldSchema = new mongoose.Schema(
  {
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
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

companyFieldSchema.add({ deleted_at: Date });

const CompanyField = mongoose.model("CompanyField", companyFieldSchema);

module.exports = CompanyField;
