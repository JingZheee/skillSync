const mongoose = require("mongoose");

const companyTagSchema = new mongoose.Schema(
  {
    company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
    tag: { type: mongoose.Schema.Types.ObjectId, ref: "Tag" },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

companyTagSchema.add({ deleted_at: Date });

const CompanyTag = mongoose.model("CompanyTag", companyTagSchema);

module.exports = CompanyTag;
