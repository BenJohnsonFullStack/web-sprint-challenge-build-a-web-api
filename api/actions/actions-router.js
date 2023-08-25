// Write your "actions" router here!
const express = require("express");
const Actions = require("./actions-model");

const { validateActionId } = require("./actions-middleware");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const actions = await Actions.get();
    res.json(actions);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", validateActionId, (req, res) => {
  const { action } = req;
  res.json(action);
});

// eslint-disable-next-line no-unused-vars
router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = router;
