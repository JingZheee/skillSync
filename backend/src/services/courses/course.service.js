const BaseService = require("../base.service");
const Student = require("../../models/student");

class CourseService extends BaseService {
  constructor(model) {
    super(model);
  }

  async findByCompany(companyId) {
    return await this.findAll({ company: companyId });
  }

  async findEnrolledStudents(courseId) {
    const students = await Student.find({
      courses: courseId,
      deleted_at: null,
    }).select("-password");

    return students;
  }

  async enrollStudent(courseId, studentId) {
    return await Student.findByIdAndUpdate(
      studentId,
      {
        $addToSet: { courses: courseId },
        $set: { updated_at: new Date() },
      },
      { new: true }
    ).populate("courses");
  }

  async unenrollStudent(courseId, studentId) {
    return await Student.findByIdAndUpdate(
      studentId,
      {
        $pull: { courses: courseId },
        $set: { updated_at: new Date() },
      },
      { new: true }
    ).populate("courses");
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

module.exports = CourseService;
