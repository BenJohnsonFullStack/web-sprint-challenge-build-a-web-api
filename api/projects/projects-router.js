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
  res.json({ message: "Hello from projects" });
});

router.get("/:id", validateProjectId, (req, res) => {
  const { project } = req;
  res.json(project);
});

router.post("/", validateProject, async (req, res) => {
  const { name, description } = req.body;
  const newProject = await Projects.insert({
    name: name,
    description: description,
  });
  res.status(201).json(newProject);
});

router.put("/:id", validateProjectId, validateProject, async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const updatedProject = await Projects.update(id, {
    name: name,
    description: description,
  });
  res.json(updatedProject);
});

// eslint-disable-next-line no-unused-vars
router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = router;
