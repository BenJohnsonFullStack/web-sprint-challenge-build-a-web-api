// add middlewares here related to actions
const Actions = require("./actions-model");
const Projects = require("../projects/projects-model");

async function validateActionId(req, res, next) {
  const { id } = req.params;
  const action = await Actions.get(id);
  try {
    if (!action) {
      res.status(404).json({ message: `Could not find action with id ${id}` });
    } else {
      req.action = action;
      next();
    }
  } catch (err) {
    next(err);
  }
}

async function validateAction(req, res, next) {
  const { project_id, description, notes } = req.body;
  try {
    if (!notes || description.length > 128 || !project_id) {
      res.status(400).json({
        message: "Please include a valid project id, description, and notes",
      });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
}

async function verifyId(req, res, next) {
  const { project_id } = req.body;
  const project = await Projects.get(project_id);
  if (!project) {
    res.status(404).json({ message: "Project not found" });
  } else {
    next();
  }
}

module.exports = {
  validateActionId,
  validateAction,
  verifyId,
};
