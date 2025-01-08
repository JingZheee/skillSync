const BaseService = require("../base.service");

class StudentService extends BaseService {
  constructor(model) {
    super(model);
  }

  async findByField(fieldId) {
    return await this.findAll({ field: fieldId });
  }

  async findByRank(rankId) {
    return await this.findAll({ rank: rankId });
  }

  async findAll(filter = {}, options = {}) {
    return await super.findAll(filter, {
      ...options,
      populate: ["field", "rank"],
    });
  }

  async findById(id) {
    return await super.findById(id, ["field", "rank"]);
  }
}

module.exports = StudentService;
