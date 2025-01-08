const { Challenge, Field, SubField, Tag, ChallengeTag, ChallengeField } = require("../../models");

const challenges = [
  {
    title: "Build a REST API",
    description: "Create a RESTful API with Node.js and Express, including authentication and database integration.",
    difficulty: "medium",
    timeEstimate: 120, // in minutes
    field: "Technology",
    subField: "Web Development",
    learningObjective: [
      "Understand RESTful API principles",
      "Implement authentication middleware",
      "Create database models and controllers"
    ],
    stepToStepInstructions: [
      "Set up a Node.js project with Express",
      "Implement user authentication",
      "Create CRUD endpoints",
      "Add input validation",
      "Implement error handling"
    ],
    additionalResources: [
      { title: "Express Documentation", url: "https://expressjs.com" },
      { title: "MongoDB Atlas", url: "https://www.mongodb.com/cloud/atlas" }
    ],
    submissionGuidelines: [
      "Submit GitHub repository link",
      "Include README with setup instructions",
      "Deploy to a cloud platform"
    ],
    evaluationCriteria: [
      "Code quality and organization",
      "API documentation",
      "Error handling",
      "Security implementation"
    ],
    skills: ["Node.js", "Express", "MongoDB"]
  },
  {
    title: "React State Management",
    description: "Implement complex state management in a React application using Redux and middleware.",
    difficulty: "hard",
    timeEstimate: 180,
    field: "Technology",
    subField: "Web Development",
    learningObjective: [
      "Master Redux architecture",
      "Implement middleware for side effects",
      "Handle complex application state"
    ],
    stepToStepInstructions: [
      "Set up Redux store",
      "Create actions and reducers",
      "Implement Redux middleware",
      "Connect React components",
      "Add async operations"
    ],
    additionalResources: [
      { title: "Redux Documentation", url: "https://redux.js.org" },
      { title: "Redux Toolkit", url: "https://redux-toolkit.js.org" }
    ],
    submissionGuidelines: [
      "Submit working application code",
      "Include test coverage",
      "Document state management approach"
    ],
    evaluationCriteria: [
      "State management implementation",
      "Component architecture",
      "Performance optimization",
      "Code organization"
    ],
    skills: ["React", "Redux", "JavaScript"]
  }
];

async function seedChallenges() {
  try {
    // Clear existing challenges and related data
    await Challenge.deleteMany({});
    await ChallengeTag.deleteMany({});
    await ChallengeField.deleteMany({});

    for (const challengeData of challenges) {
      // Find field and subfield
      const field = await Field.findOne({ name: challengeData.field });
      const subField = await SubField.findOne({ 
        name: challengeData.subField,
        field: field._id 
      });

      // Create challenge
      const challenge = await Challenge.create({
        title: challengeData.title,
        description: challengeData.description,
        difficulty: challengeData.difficulty,
        timeEstimate: challengeData.timeEstimate,
        learningObjective: challengeData.learningObjective,
        stepToStepInstructions: challengeData.stepToStepInstructions,
        additionalResources: new Map(
          challengeData.additionalResources.map(resource => [
            resource.title,
            { title: resource.title, url: resource.url }
          ])
        ),
        submissionGuidelines: challengeData.submissionGuidelines,
        evaluationCriteria: challengeData.evaluationCriteria
      });

      // Create challenge-field relationship
      await ChallengeField.create({
        challenge: challenge._id,
        field: field._id,
        subFields: [subField._id]
      });

      // Create challenge-tag relationships
      for (const skillName of challengeData.skills) {
        const tag = await Tag.findOne({ name: skillName });
        if (tag) {
          await ChallengeTag.create({
            challengeId: challenge._id,
            tag: tag._id
          });
        }
      }
    }

    console.log("✅ Challenges seeded successfully");
  } catch (error) {
    console.error("❌ Error seeding challenges:", error);
    throw error;
  }
}

module.exports = seedChallenges;