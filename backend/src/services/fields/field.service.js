const BaseService = require("../base.service");
const { Field, Student, Tag } = require("../../models");
class FieldService extends BaseService {
  constructor(model) {
    super(model);
  }

  async findStudents(fieldId) {
    return await Student.find({
      field: fieldId,
      deleted_at: null,
    });
  }

  async findTags(fieldId) {
    return await Tag.find({
      field: fieldId,
      deleted_at: null,
    });
  }

  async findAll(filter = {}, options = {}) {
    return await super.findAll(filter, {
      ...options,
      sort: { name: 1 },
    });
  }

  async findMainField(fieldId) {
    return await Field.findById(fieldId).populate("mainField");
  }

  async findSubFields(fieldId) {
    return await Field.find({ mainField: fieldId });
  }
}

module.exports = FieldService;
