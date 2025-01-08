const BaseController = require("../base.controller");

class CompanyController extends BaseController {
  constructor(service) {
    super(service);
    this.getCompanyChallenges = this.getCompanyChallenges.bind(this);
    this.getCompanyHackathons = this.getCompanyHackathons.bind(this);
    this.getCompanyCourses = this.getCompanyCourses.bind(this);
  }

  getPath() {
    return "companies";
  }

  initializeRoutes() {
    super.initializeRoutes();
    
    this.router.get("/:id/challenges", this.getCompanyChallenges);
    this.router.get("/:id/hackathons", this.getCompanyHackathons);
    this.router.get("/:id/courses", this.getCompanyCourses);
  }

  async getCompanyChallenges(req, res) {
    try {
      const { id } = req.params;
      const data = await this.service.findCompanyChallenges(id);
      res.json(this.responseType.success(data));
    } catch (error) {
      res.status(500).json(this.responseType.error(error.message));
    }
  }

  async getCompanyHackathons(req, res) {
    try {
      const { id } = req.params;
      const data = await this.service.findCompanyHackathons(id);
      res.json(this.responseType.success(data));
    } catch (error) {
      res.status(500).json(this.responseType.error(error.message));
    }
  }

  async getCompanyCourses(req, res) {
    try {
      const { id } = req.params;
      const data = await this.service.findCompanyCourses(id);
      res.json(this.responseType.success(data));
    } catch (error) {
      res.status(500).json(this.responseType.error(error.message));
    }
  }
}

module.exports = CompanyController;