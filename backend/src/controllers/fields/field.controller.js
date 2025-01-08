const BaseController = require("../base.controller");
const ResponseType = require("../../types/responseType");
class FieldController extends BaseController {
  constructor(service) {
    super(service);

    this.initializeRoutes = this.initializeRoutes.bind(this);

    this.getStudents = this.getStudents.bind(this);
    this.getTags = this.getTags.bind(this);
    this.getMainField = this.getMainField.bind(this);
    this.getSubFields = this.getSubFields.bind(this);
  }

  getPath() {
    return "fields";
  }

  initializeRoutes() {
    super.initializeRoutes();

    this.router.get("/:id/students", (req, res) => this.getStudents(req, res));
    this.router.get("/:id/tags", (req, res) => this.getTags(req, res));
    this.router.get("/:id/main", (req, res) => this.getMainField(req, res));
    this.router.get("/:id/subfields", (req, res) =>
      this.getSubFields(req, res)
    );
  }

  async getStudents(req, res) {
    try {
      const { id } = req.params;
      const data = await this.service.findStudents(id);
      res.json(ResponseType.success(data));
    } catch (error) {
      res.status(500).json(ResponseType.error(error.message));
    }
  }

  async getTags(req, res) {
    try {
      const { id } = req.params;
      const data = await this.service.findTags(id);
      res.json(ResponseType.success(data));
    } catch (error) {
      res.status(500).json(ResponseType.error(error.message));
    }
  }

  async getMainField(req, res) {
    console.log("this.service", this.service);
    try {
      const { id } = req.params;
      const data = await this.service.findMainField(id);
      res.json(ResponseType.success(data));
    } catch (error) {
      res.status(500).json(ResponseType.error(error.message));
    }
  }

  async getSubFields(req, res) {
    try {
      const { id } = req.params;
      const data = await this.service.findSubFields(id);
      res.json(ResponseType.success(data));
    } catch (error) {
      res.status(500).json(ResponseType.error(error.message));
    }
  }
}

module.exports = FieldController;
