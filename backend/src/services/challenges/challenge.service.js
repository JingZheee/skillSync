const BaseService = require("../base.service");
const { StudentChallenge, Submission } = require("../../models");
const fs = require("fs").promises;

class ChallengeService extends BaseService {
  constructor(model) {
    super(model);
  }

  async findByCompany(companyId) {
    return await this.findAll(
      { company: companyId, deleted_at: null },
      {
        populate: [
          { path: "field.main" },
          { path: "field.sub" },
          { path: "tags" },
          { path: "company" },
        ],
      }
    );
  }

  async findByHackathon(hackathonId) {
    return await this.findAll(
      { hackathon: hackathonId, deleted_at: null },
      {
        populate: [
          { path: "field.main" },
          { path: "field.sub" },
          { path: "tags" },
          { path: "company" },
        ],
      }
    );
  }

  async findStudentSubmissions(challengeId) {
    return await StudentChallenge.find({
      challenge: challengeId,
      deleted_at: null,
    }).populate([
      {
        path: "student",
        select: "-password",
      },
      {
        path: "submissions",
        populate: {
          path: "reviewer",
          select: "name email",
        },
      },
    ]);
  }

  async submitChallenge(challengeId, studentId, uploadedFiles, notes) {
    // Check if student has already submitted
    const existingSubmission = await StudentChallenge.findOne({
      challenge: challengeId,
      student: studentId,
      deleted_at: null,
    });

    if (existingSubmission) {
      throw new Error("Student has already submitted this challenge");
    }

    // Create new submission
    const submission = new Submission({
      files: uploadedFiles,
      notes: notes,
      submittedAt: new Date(),
      status: "Not Started",
    });

    await submission.save();

    // Create student challenge record
    const studentChallenge = new StudentChallenge({
      student: studentId,
      challenge: challengeId,
      submissions: [submission._id],
      status: "In Progress",
      startedAt: new Date(),
    });

    return await studentChallenge.save();
  }

  async updateSubmissionStatus(submissionId, status, reviewerId, feedback) {
    if (!["Not Started", "In Progress", "Completed"].includes(status)) {
      throw new Error("Invalid status value");
    }

    const submission = await Submission.findOneAndUpdate(
      { _id: submissionId, deleted_at: null },
      {
        status,
        feedback,
        reviewer: reviewerId,
        reviewedAt: new Date(),
      },
      { new: true }
    ).populate([
      {
        path: "reviewer",
        select: "name email",
      },
    ]);

    if (!submission) {
      throw new Error("Submission not found");
    }

    // If status is completed, update the StudentChallenge record
    if (status === "Completed") {
      await StudentChallenge.findOneAndUpdate(
        { submissions: submissionId, deleted_at: null },
        {
          status: "Completed",
          completedAt: new Date(),
        }
      );
    }

    return submission;
  }

  async findAll(filter = {}, options = {}) {
    return await super.findAll(
      { ...filter, deleted_at: null },
      {
        populate: [
          { path: "field.main" },
          { path: "field.sub" },
          { path: "tags" },
          { path: "company" },
          { path: "hackathon" },
        ],
        ...options,
      }
    );
  }

  async findById(id) {
    return await super.findById(id, [
      { path: "field.main" },
      { path: "field.sub" },
      { path: "tags" },
      { path: "company" },
      { path: "hackathon" },
    ]);
  }

  async create(data) {
    try {
      // Validate files if present
      if (data.challengeFiles) {
        const totalSize = data.challengeFiles.reduce(
          (sum, file) => sum + file.size,
          0
        );
        if (totalSize > 25 * 1024 * 1024) {
          // 25MB total limit
          throw new Error("Total file size exceeds 25MB limit");
        }
      }

      return await super.create(data);
    } catch (error) {
      // Clean up files if challenge creation fails
      if (data.challengeFiles) {
        await Promise.all(
          data.challengeFiles.map((file) =>
            fs.unlink(file.path).catch(() => {})
          )
        );
      }
      throw error;
    }
  }

  async delete(id) {
    const challenge = await this.findById(id);
    if (challenge?.challengeFiles?.length) {
      await Promise.all(
        challenge.challengeFiles.map((file) =>
          fs.unlink(file.path).catch(() => {})
        )
      );
    }
    return await super.delete(id);
  }
}

module.exports = ChallengeService;
