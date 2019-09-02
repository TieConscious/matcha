const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");

//Item Model
const User = require("../../models/User.model");

//@route	POST api/auth
//@desc		Authenticate user
//@access	Public

router.route("/logout").post(function(req, res) {
  console.log(req.body);
  const { id } = req.body;
  User.findById(id, function(err, user) {
    if (!user) res.status(404).send("User not found");
    else {
      user.isOnline = false;
      user.lastLogin = new Date();
      user
        .save()
        .then(user => {
          res.status(200).send(user);
        })
        .catch(err => {
          res.status(400).send("update not possible due to " + err);
        });
    }
  });
});

router.post("/", (req, res) => {
  const { email, password } = req.body;
  //Simple validation
  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  //Check for existing user
  User.findOne({ email }).then(user => {
    if (!user) return res.status(400).json({ msg: "Email does not exist" });

    // Validate password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch) return res.status(400).json({ msg: "Invalid password" });
      else {
        user.lastLogin = new Date();
        user.isOnline = true;
        user
        .save()
        .then(user => {
          console.log("last login saved");
        })
        .catch(err => {
          console.log("error saving date: " + err);
        });
      }
      jwt.sign(
        { id: user.id },
        config.get("jwtSecret"),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
            user
          });
        }
      );
    });
  });
});

// @route   GET api/auth/user
// @desc    Get user data
// @access  Private
router.get('/user', auth, (req, res) => {
  User.findById(req.user.id)
    .select('-password')
    .then(user => res.json(user));
});

module.exports = router;
