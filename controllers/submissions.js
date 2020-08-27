const debug = require("debug")("angular-quiz-pwa:submissions");
const mongoose = require("mongoose");

// User Model
const User = require("../models/users");
// Submission Model
const Submission = require("../models/submissions");

// Create a new submission
exports.Create = (req, res) => {
  User.findById(req.user.id)
    .then((user) => {
      if (!user) return res.status(400).json({ msg: "User does not exist" });

      const { _id, firstname, lastname, email } = user;
      const { score } = req.body;

      const submission = new Submission({
        _id: mongoose.Types.ObjectId(),
        userid: _id,
        firstname,
        lastname,
        email,
        score,
      });

      submission.save((err) => {
        if (err) {
          debug(err);
          return res.status(400).json({ msg: "Unexpected Error" });
        }
        res.json({ submission: { id: submission._id }, msg: "OK" });
      });
    })
    .catch((err) => {
      debug(err);
      return res.status(400).json({ msg: "Unexpected Error" });
    });
};

// Read top 10 submissions
exports.Read = (req, res) => {
  Submission.find()
    .select("-userid")
    .sort({ score: -1, timestamp: -1 })
    .then((submissions) => {
      res.json({ submissions, msg: "OK" });
    })
    .catch((err) => {
      debug(err);
      return res.status(400).json({ msg: "Unexpected Error" });
    });
};
