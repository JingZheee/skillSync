const BaseController = require("../base.controller");

class CourseController extends BaseController {
  constructor(service) {
    super(service);
    this.getByCompanyId = this.getByCompanyId.bind(this);
    this.getEnrolledStudents = this.getEnrolledStudents.bind(this);
    this.enrollStudent = this.enrollStudent.bind(this);
    this.unenrollStudent = this.unenrollStudent.bind(this);
  }

  getPath() {
    return "courses";
  }

  initializeRoutes() {
    super.initializeRoutes();

    this.router.get("/company/:companyId", (req, res) =>
      this.getByCompanyId(req, res)
    );
    this.router.get("/:id/students", (req, res) =>
      this.getEnrolledStudents(req, res)
    );
    this.router.post("/:id/enroll/:studentId", (req, res) =>
      this.enrollStudent(req, res)
    );
    this.router.delete("/:id/enroll/:studentId", (req, res) =>
      this.unenrollStudent(req, res)
    );
  }

  async getByCompanyId(req, res) {
    try {
      const { companyId } = req.params;
      const data = await this.service.findByCompany(companyId);
      res.json(this.responseType.success(data));
    } catch (error) {
      res.status(500).json(this.responseType.error(error.message));
    }
  }

  async getEnrolledStudents(req, res) {
    try {
      const { courseId } = req.params;
      const students = await this.service.getEnrolledStudents(courseId);
      res.status(200).json({
        success: true,
        data: students,
        message: "Enrolled students retrieved successfully",
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async enrollStudent(req, res) {
    try {
      const { courseId, studentId } = req.body;
      const enrollment = await this.service.enrollStudent(courseId, studentId);
      res.status(201).json({
        success: true,
        data: enrollment,
        message: "Student enrolled successfully",
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async unenrollStudent(req, res) {
    try {
      const { courseId, studentId } = req.body;
      const enrollment = await this.service.unenrollStudent(
        courseId,
        studentId
      );
      res.status(200).json({
        success: true,
        data: enrollment,
        message: "Student unenrolled successfully",
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = CourseController;
