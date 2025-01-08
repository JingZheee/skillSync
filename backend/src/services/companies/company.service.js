const BaseService = require("../base.service");
const Challenge = require("../../models/challenge");
const Hackathon = require("../../models/hackathon");
const Course = require("../../models/course");

class CompanyService extends BaseService {
  constructor(model) {
    super(model);
  }

  async findCompanyChallenges(companyId) {
    return await Challenge.find({
      company: companyId,
      deleted_at: null,
    }).populate("tags");
  }

  async findCompanyHackathons(companyId) {
    return await Hackathon.find({
      company: companyId,
      deleted_at: null,
    }).populate("tags");
  }

  async findCompanyCourses(companyId) {
    return await Course.find({
      company: companyId,
      deleted_at: null,
    }).populate("tags");
  }

  async findAll(filter = {}, options = {}) {
    return await super.findAll(filter, {
      ...options,
      populate: ["tags"],
    });
  }

  async findById(id) {
    return await super.findById(id, ["tags"]);
  }
}

module.exports = CompanyService;
