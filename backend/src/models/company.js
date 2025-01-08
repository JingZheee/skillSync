const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String },
    email: { type: String, unique: true, required: true },
    companyName: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

companySchema.add({ deleted_at: Date });

const Company = mongoose.model("Company", companySchema);

module.exports = Company;
