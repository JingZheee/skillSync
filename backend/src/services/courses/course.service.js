const BaseService = require("../base.service");
const StudentCourse = require("../../models/studentCourse");

class CourseService extends BaseService {
  constructor(model) {
    super(model);
  }

  async findByCompany(companyId) {
    return await this.findAll({ company: companyId });
  }

  async findEnrolledStudents(courseId) {
    const enrollments = await StudentCourse.find({
      course: courseId,
      deleted_at: null,
    }).populate("student");

    return enrollments.map((enrollment) => enrollment.student);
  }

  async enrollStudent(courseId, studentId) {
    try {
      const enrollment = await StudentCourse.create({
        student: studentId,
        course: courseId,
      });
      return enrollment;
    } catch (error) {
      throw new Error(`Failed to enroll student: ${error.message}`);
    }
  }

  async unenrollStudent(courseId, studentId) {
    try {
      const enrollment = await StudentCourse.findOne({
        student: studentId,
        course: courseId,
        deleted_at: null,
      });

      if (!enrollment) {
        throw new Error("Enrollment not found");
      }

      enrollment.deleted_at = new Date();
      await enrollment.save();
      return enrollment;
    } catch (error) {
      throw new Error(`Failed to unenroll student: ${error.message}`);
    }
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

  async getEnrolledStudents(courseId) {
    try {
      const enrollments = await StudentCourse.find({
        course: courseId,
        deleted_at: null,
      }).populate("student");
      return enrollments.map((enrollment) => enrollment.student);
    } catch (error) {
      throw new Error(`Failed to get enrolled students: ${error.message}`);
    }
  }
}

module.exports = CourseService;
