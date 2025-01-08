const BaseService = require("../base.service");
const StudentChallenge = require("../../models/studentChallenge");
const fs = require("fs").promises;
const path = require("path");

class ChallengeService extends BaseService {
  constructor(model) {
    super(model);
  }

  async findByCompany(companyId) {
    return await this.findAll({ company: companyId });
  }

  async findByHackathon(hackathonId) {
    return await this.findAll({ hackathon: hackathonId });
  }

  async findStudentSubmissions(challengeId) {
    return await StudentChallenge.find({
      miniChallenge: challengeId,
      deleted_at: null,
    }).populate(["student", "miniChallenge"]);
  }

  async submitChallenge(challengeId, studentId, uploadedFiles, notes) {
    // Check if student has already submitted
    const existingSubmission = await StudentChallenge.findOne({
      miniChallenge: challengeId,
      student: studentId,
      deleted_at: null,
    });

    if (existingSubmission) {
      throw new Error("Student has already submitted this challenge");
    }

    // Create new submission
    const submission = new StudentChallenge({
      student: studentId,
      miniChallenge: challengeId,
      submittedFiles: uploadedFiles,
      notes: notes,
      submittedDate: new Date(),
      status: "Pending",
    });

    return await submission.save();
  }

  async updateSubmissionStatus(submissionId, status) {
    if (!["Pending", "Approved", "Rejected"].includes(status)) {
      throw new Error("Invalid status");
    }

    return await StudentChallenge.findOneAndUpdate(
      { _id: submissionId, deleted_at: null },
      { status },
      { new: true }
    ).populate(["student", "miniChallenge"]);
  }

  async findAll(filter = {}, options = {}) {
    return await super.findAll(filter, {
      ...options,
      populate: ["company", "hackathon", "tags"],
    });
  }

  async findById(id) {
    return await super.findById(id, ["company", "hackathon", "tags"]);
  }

  async create(data) {
    try {
      // Validate files
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

      const challenge = await super.create(data);
      return challenge;
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
