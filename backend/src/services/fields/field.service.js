const BaseService = require("../base.service");

class FieldService extends BaseService {
  constructor(model) {
    super(model);
  }

  async findStudents(fieldId) {
    const { Student } = require("../../models");
    return await Student.find({ 
      field: fieldId,
      deleted_at: null 
    });
  }

  async findTags(fieldId) {
    const { Tag } = require("../../models");
    return await Tag.find({ 
      field: fieldId,
      deleted_at: null 
    });
  }

  async findAll(filter = {}, options = {}) {
    return await super.findAll(filter, {
      ...options,
      sort: { name: 1 }
    });
  }
}

module.exports = FieldService;