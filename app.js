require("dotenv").config();

const path = require("path");
const express = require("express");
const logger = require("morgan");

const app = express();

/**
 * Middleware
 */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
process.env.NODE_ENV === "development" ? app.use(logger("dev")) : null;

/**
 * API Routes
 */
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/questions", require("./routes/api/questions"));
app.use("/api/submissions", require("./routes/api/submission"));

/**
 * Static Assets
 */
if (process.env.NODE_ENV === "production") {
  app.use(express.static("public"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "public", "index.html"));
  });
}

module.exports = app;
