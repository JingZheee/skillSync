const mongoose = require("mongoose");
const connectDB = require("../../config/database");
const seedFields = require("./fieldSeeder");
const seedTags = require("./tagSeeder");
const seedChallenges = require("./challengeSeeder");
const seedCompanies = require("./companySeeder");
const seedStudents = require("./studentSeeder");
const seedRankings = require("./rankingSeeder");
async function seedDatabase() {
  try {
    // Connect to database
    await connectDB();

    // Verify connection is ready
    if (mongoose.connection.readyState !== 1) {
      throw new Error("Database connection is not ready");
    }

    // Drop all collections
    console.log("🗑️ Dropping all collections...");
    const collections = await mongoose.connection.db.collections();
    for (let collection of collections) {
      await collection.drop();
    }
    console.log("✅ All collections dropped successfully");

    // Run seeders
    await seedRankings();
    await seedFields();
    await seedTags();
    await seedChallenges();
    await seedCompanies();
    await seedStudents();

    console.log("✅ All seeds completed successfully");

    // Close connection if not in production
    if (process.env.NODE_ENV !== "production") {
      await mongoose.connection.close();
      console.log("📡 Database connection closed");
    }
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    // Ensure connection is closed on error
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close();
    }
    process.exit(1);
  }
}

// Run seeder if this file is run directly
if (require.main === module) {
  seedDatabase();
}

module.exports = seedDatabase;
