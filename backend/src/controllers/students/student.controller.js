const BaseController = require("../base.controller");

class StudentController extends BaseController {
  constructor(service) {
    super(service);
    this.getByField = this.getByField.bind(this);
    this.getByRank = this.getByRank.bind(this);
  }

  getPath() {
    return "students";
  }

  initializeRoutes() {
    super.initializeRoutes();

    this.router.get("/field/:fieldId", this.getByField);
    this.router.get("/rank/:rankId", this.getByRank);
  }

  async getByField(req, res) {
    try {
      const { fieldId } = req.params;
      const data = await this.service.findByField(fieldId);
      res.json(this.responseType.success(data));
    } catch (error) {
      res.status(500).json(this.responseType.error(error.message));
    }
  }

  async getByRank(req, res) {
    try {
      const { rankId } = req.params;
      const data = await this.service.findByRank(rankId);
      res.json(this.responseType.success(data));
    } catch (error) {
      res.status(500).json(this.responseType.error(error.message));
    }
  }
}

module.exports = StudentController;
