// add middlewares here related to projects
const Projects = require("./projects-model");

async function validateProjectId(req, res, next) {
  const { id } = req.params;
  const project = await Projects.get(id);
  try {
    if (!project) {
      res.status(404).json({ message: `Could not find project with id ${id}` });
    } else {
      req.project = project;
      next();
    }
  } catch (err) {
    next(err);
  }
}

module.exports = {
  validateProjectId,
};
