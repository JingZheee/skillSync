const BaseController = require("../base.controller");

class FieldController extends BaseController {
  constructor(service) {
    super(service);
    this.getStudents = this.getStudents.bind(this);
    this.getTags = this.getTags.bind(this);
  }

  getPath() {
    return "fields";
  }

  initializeRoutes() {
    super.initializeRoutes();
    
    this.router.get("/:id/students", this.getStudents);
    this.router.get("/:id/tags", this.getTags);
  }

  async getStudents(req, res) {
    try {
      const { id } = req.params;
      const data = await this.service.findStudents(id);
      res.json(this.responseType.success(data));
    } catch (error) {
      res.status(500).json(this.responseType.error(error.message));
    }
  }

  async getTags(req, res) {
    try {
      const { id } = req.params;
      const data = await this.service.findTags(id);
      res.json(this.responseType.success(data));
    } catch (error) {
      res.status(500).json(this.responseType.error(error.message));
    }
  }
}

module.exports = FieldController;