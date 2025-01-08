const BaseController = require("../base.controller");

class TagController extends BaseController {
  constructor(service) {
    super(service);
    // Bind all methods
    this.getByFieldId = this.getByFieldId.bind(this);
    this.getByStudentId = this.getByStudentId.bind(this);
    this.getByCompanyId = this.getByCompanyId.bind(this);
    this.getByHackathonId = this.getByHackathonId.bind(this);
    this.getByChallengeId = this.getByChallengeId.bind(this);
  }

  getPath() {
    return "tags";
  }

  initializeRoutes() {
    // Call parent's routes first
    super.initializeRoutes();
    
    // Add all tag-related routes
    this.router.get("/field/:fieldId", this.getByFieldId);
    this.router.get("/student/:studentId", this.getByStudentId);
    this.router.get("/company/:companyId", this.getByCompanyId);
    this.router.get("/hackathon/:hackathonId", this.getByHackathonId);
    this.router.get("/challenge/:challengeId", this.getByChallengeId);
  }

  async getByFieldId(req, res) {
    try {
      const { fieldId } = req.params;
      const data = await this.service.findByField(fieldId);
      res.json(this.responseType.success(data));
    } catch (error) {
      res.status(500).json(this.responseType.error(error.message));
    }
  }

  async getByStudentId(req, res) {
    try {
      const { studentId } = req.params;
      const data = await this.service.findByStudent(studentId);
      res.json(this.responseType.success(data));
    } catch (error) {
      res.status(500).json(this.responseType.error(error.message));
    }
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

  async getByChallengeId(req, res) {
    try {
      const { challengeId } = req.params;
      const data = await this.service.findByChallenge(challengeId);
      res.json(this.responseType.success(data));
    } catch (error) {
      res.status(500).json(this.responseType.error(error.message));
    }
  }
}

module.exports = TagController;
