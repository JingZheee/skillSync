const BaseController = require("../base.controller");

class ChallengeController extends BaseController {
  constructor(service) {
    super(service);
    this.getByCompanyId = this.getByCompanyId.bind(this);
    this.getByHackathonId = this.getByHackathonId.bind(this);
    // Student Challenges
    this.getStudentSubmissions = this.getStudentSubmissions.bind(this);
    this.submitChallenge = this.submitChallenge.bind(this);
    this.updateSubmissionStatus = this.updateSubmissionStatus.bind(this);
  }

  getPath() {
    return "challenges";
  }

  initializeRoutes() {
    super.initializeRoutes();

    this.router.get("/company/:companyId", this.getByCompanyId);
    this.router.get("/hackathon/:hackathonId", this.getByHackathonId);
    // Student Challenges
    this.router.get("/:id/submissions", this.getStudentSubmissions);
    this.router.post("/:id/submit", this.submitChallenge);
    this.router.patch(
      "/submission/:submissionId/status",
      this.updateSubmissionStatus
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

  async getByHackathonId(req, res) {
    try {
      const { hackathonId } = req.params;
      const data = await this.service.findByHackathon(hackathonId);
      res.json(this.responseType.success(data));
    } catch (error) {
      res.status(500).json(this.responseType.error(error.message));
    }
  }

  async getStudentSubmissions(req, res) {
    try {
      const { id } = req.params;
      const data = await this.service.findStudentSubmissions(id);
      res.json(this.responseType.success(data));
    } catch (error) {
      res.status(500).json(this.responseType.error(error.message));
    }
  }

  async submitChallenge(req, res) {
    try {
      const { id } = req.params;
      const { studentId, uploadedFile } = req.body;
      const data = await this.service.submitChallenge(
        id,
        studentId,
        uploadedFile
      );
      res
        .status(201)
        .json(
          this.responseType.success(data, "Challenge submitted successfully")
        );
    } catch (error) {
      res.status(400).json(this.responseType.error(error.message));
    }
  }

  async updateSubmissionStatus(req, res) {
    try {
      const { submissionId } = req.params;
      const { status } = req.body;
      const data = await this.service.updateSubmissionStatus(
        submissionId,
        status
      );
      res.json(
        this.responseType.success(
          data,
          "Submission status updated successfully"
        )
      );
    } catch (error) {
      res.status(400).json(this.responseType.error(error.message));
    }
  }
}

module.exports = ChallengeController;
