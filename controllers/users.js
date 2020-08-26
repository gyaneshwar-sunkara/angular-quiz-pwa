const bcrypt = require("bcryptjs");
const debug = require("debug")("angular-quiz-pwa:users");

// User Model
const User = require("../models/users");

// Create a new user
exports.Create = (req, res, next) => {
  const { firstname, lastname, email, password } = req.body;

  // Validation
  if (!firstname || !lastname || !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  // Check for existing user
  User.findOne({ email })
    .then((user) => {
      if (user) return res.status(400).json({ msg: "Email already exists" });

      // Create new user
      const newUser = new User({
        firstname,
        lastname,
        email,
        password,
      });

      // Generate salt
      bcrypt.genSalt(10, (err, salt) => {
        // Create hash for password
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) {
            debug(err);
            return res.status(400).json({ msg: "Unexpected Error" });
          }
          newUser.password = hash;
          // Save new user
          newUser
            .save()
            .then((user) => {
              // Next middleware
              next();
            })
            .catch((err) => {
              debug(err);
              return res.status(400).json({ msg: "Unexpected Error" });
            });
        });
      });
    })
    .catch((err) => {
      debug(err);
      return res.status(400).json({ msg: "Unexpected Error" });
    });
};

// Read a user
exports.Read = (req, res) => {
  // Check for existing user
  User.findById(req.user.id)
    .select("-_id -password -__v")
    .then((user) => {
      if (!user) return res.status(400).json({ msg: "User does not exist" });
      res.json({ user, msg: "OK" });
    })
    .catch((err) => {
      debug(err);
      return res.status(400).json({ msg: "Unexpected Error" });
    });
};

// Update a user
exports.Update = (req, res) => {
  // Check for existing user
  User.findById(req.user.id)
    .then((user) => {
      if (!user) return res.status(400).json({ msg: "User does not exist" });

      // Check if fields are changed
      const firstname = req.body.firstname
        ? req.body.firstname
        : user.firstname;
      const lastname = req.body.lastname ? req.body.lastname : user.lastname;

      if (firstname !== user.firstname || lastname !== user.lastname) {
        user.firstname = firstname;
        user.lastname = lastname;
        user.save((err) => {
          if (err) {
            debug(err);
            return res.status(400).json({ msg: "Unexpected Error" });
          }
          const { firstname, lastname, email, date } = user;
          res.json({ user: { firstname, lastname, email, date }, msg: "OK" });
        });
      } else {
        return res.json({ msg: "Nothing to update" });
      }
    })
    .catch((err) => {
      debug(err);
      return res.status(400).json({ msg: "Unexpected Error" });
    });
};

// Delete a user
exports.Delete = (req, res) => {
  User.findById(req.user.id)
    .then((user) => {
      if (!user) return res.status(400).json({ msg: "User does not exist" });
      else {
        user.deleteOne({ _id: req.user.id }, (err) => {
          if (err) {
            debug(err);
            return res.status(400).json({ msg: "Unexpected Error" });
          }
          res.status(200).json({ msg: "OK" });
        });
      }
    })
    .catch((err) => {
      debug(err);
      return res.status(400).json({ msg: "Unexpected Error" });
    });
};
