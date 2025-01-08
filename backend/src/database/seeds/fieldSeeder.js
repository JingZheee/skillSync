const { Field } = require("../../models");

const mainFields = [
  {
    name: "Technology",
    description:
      "Computer science, software development, and IT related fields",
    subfields: [
      "Web Development",
      "Mobile Development",
      "Cloud Computing",
      "Data Science",
      "Cybersecurity",
    ],
  },
  {
    name: "Business",
    description: "Business administration and management fields",
    subfields: ["Strategy", "Operations", "Management", "Entrepreneurship"],
  },
  {
    name: "Finance",
    description: "Financial markets, banking, and investment fields",
    subfields: ["Investment", "FinTech", "Risk Management", "Trading"],
  },
  {
    name: "Design",
    description: "Digital and physical design disciplines",
    subfields: ["UI/UX", "Graphic Design", "Product Design", "Brand Design"],
  },
  {
    name: "Marketing",
    description: "Marketing, advertising, and promotional fields",
    subfields: [
      "Digital Marketing",
      "Content Marketing",
      "Social Media",
      "SEO",
    ],
  },
];

async function seedFields() {
  try {
    // Clear existing fields
    await Field.deleteMany({});

    // First create main fields
    const createdMainFields = {};

    for (const field of mainFields) {
      const mainField = await Field.create({
        name: field.name,
        description: field.description,
        mainField: null,
      });
      createdMainFields[field.name] = mainField._id;

      // Create subfields with reference to main field
      for (const subfield of field.subfields) {
        await Field.create({
          name: subfield,
          description: `Subfield of ${field.name}`,
          mainField: mainField._id,
        });
      }
    }

    console.log("� Fields seeded successfully");
  } catch (error) {
    console.error("❌ Error seeding fields:", error);
    throw error;
  }
}

module.exports = seedFields;
