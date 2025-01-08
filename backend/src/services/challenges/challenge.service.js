const BaseService = require("../base.service");
const StudentChallenge = require("../../models/studentChallenge");

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

  async submitChallenge(challengeId, studentId, uploadedFile) {
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
      uploadedFile,
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
}

module.exports = ChallengeService;
