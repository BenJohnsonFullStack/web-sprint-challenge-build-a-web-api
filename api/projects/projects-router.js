// Write your "projects" router here!
const express = require("express");
const Projects = require("./projects-model");

const { validateProjectId, validateProject } = require("./projects-middleware");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const projects = await Projects.get();
    res.json(projects);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", validateProjectId, (req, res) => {
  const { project } = req;
  res.json(project);
});

router.post("/", validateProject, async (req, res) => {
  const { name, description, completed } = req.body;
  const newProject = await Projects.insert({
    name,
    description,
    completed,
  });
  res.status(201).json(newProject);
});

router.put("/:id", validateProjectId, validateProject, async (req, res) => {
  const { id } = req.params;
  const { name, description, completed } = req.body;
  const updatedProject = await Projects.update(id, {
    name,
    description,
    completed,
  });
  res.json(updatedProject);
});

router.delete("/:id", validateProjectId, async (req, res) => {
  const { id } = req.params;
  const projectsDeleted = await Projects.remove(id);
  res.json(projectsDeleted);
});

router.get("/:id/actions", validateProjectId, async (req, res) => {
  const { id } = req.params;
  const projectActions = await Projects.getProjectActions(id);
  res.json(projectActions);
});

// eslint-disable-next-line no-unused-vars
router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = router;
