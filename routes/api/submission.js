const express = require("express");
const router = express.Router();

// Auth middleware
const { auth } = require("../../middleware/auth");

// Leaderboard controllers
const { Create, Read } = require("../../controllers/submissions");

// @route   POST api/leaderboard
// @desc    Add new submission
// @access  Private
router.post("/", auth, Create);

// @route   GET api/leaderboard
// @desc    Get top 10 submissions
// @access  Private
router.get("/", auth, Read);

module.exports = router;
