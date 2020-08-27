const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SubmissionSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  userid: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Submission = mongoose.model("submission", SubmissionSchema);
