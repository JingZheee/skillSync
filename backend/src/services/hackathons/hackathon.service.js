const BaseService = require("../base.service");
const StudentHackathon = require("../../models/studentHackathon");
class HackathonService extends BaseService {
  constructor(model) {
    super(model);
  }

  async findByCompany(companyId) {
    return await this.findAll({ company: companyId });
  }

  async findParticipants(hackathonId) {
    const registrations = await StudentHackathon.find({
      hackathon: hackathonId,
      deleted_at: null,
    }).populate("student");

    return registrations.map((registration) => registration.student);
  }

  async registerStudent(hackathonId, studentId) {
    // Check if maximum participants limit is reached
    const hackathon = await this.findById(hackathonId);
    const currentParticipants = await StudentHackathon.countDocuments({
      hackathon: hackathonId,
      deleted_at: null,
    });

    if (
      hackathon.maxParticipants &&
      currentParticipants >= hackathon.maxParticipants
    ) {
      throw new Error("Maximum participants limit reached");
    }

    const registration = new StudentHackathon({
      hackathon: hackathonId,
      student: studentId,
    });
    return await registration.save();
  }

  async unregisterStudent(hackathonId, studentId) {
    return await StudentHackathon.findOneAndUpdate(
      {
        hackathon: hackathonId,
        student: studentId,
        deleted_at: null,
      },
      { deleted_at: new Date() },
      { new: true }
    );
  }

  async findChallenges(hackathonId) {
    return await Challenge.find({
      hackathon: hackathonId,
      deleted_at: null,
    }).populate(["company", "tags"]);
  }

  async findAll(filter = {}, options = {}) {
    return await super.findAll(filter, {
      ...options,
      populate: ["company", "tags"],
    });
  }

  async findById(id) {
    return await super.findById(id, ["company", "tags"]);
  }
}

module.exports = HackathonService;
