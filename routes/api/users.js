const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

//User Model
const User = require("../../models/User.model");

//Message Model
const Conversation = require("../../models/Conversation.model");

//@route	POST api/users
//@desc		Create a user
//@access	Public

//register
router.post("/register", (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  //Simple validation
  if (!firstname || !lastname || !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  // Check for existing user
  User.findOne({ email }).then(user => {
    if (user) return res.status(400).json({ msg: "Email already registered" });

    const newUser = new User({
      firstname,
      lastname,
      email,
      password
    });

    // Create salt & hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then(user => {
          jwt.sign(
            { id: user.id },
            config.get("jwtSecret"),
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;
              res.json({
                token,
                user: {
                  id: user.id,
                  firstname: user.firstname,
                  lastname: user.lastname,
                  email: user.email
                }
              });
            }
          );
        });
      });
    });
  });
});

router.get("/", (req, res) => {
  User.find(function(err, users) {
    if (err) {
      console.log(err);
    } else {
      res.json(users);
    }
  });
});

router.route("/:id").get(function(req, res) {
  let id = req.params.id;
  User.findById(id, function(err, user) {
    if (err) res.send(err);
    else res.json(user);
  });
});

router.route("/delete/:id").delete(function(req, res) {
  User.findById(req.params.id).remove(function(err, user) {
    if (err) res.send(err);
    else res.send("successfully deleted");
  });
});

router.route("/update/:id").post(function(req, res) {
  User.findById(req.params.id, function(err, user) {
    if (!user) res.status(404).send("User not found!!!!");
    else {
      let psswd = bcrypt.hashSync(req.body.password, 10, function(err, hash) {
        if (err) "false";
      });
      console.log(psswd);
      user.username = req.body.username;
      user.password = psswd;
      user.email = req.body.email;
      user.receiveEmails = req.body.receiveEmails;

      user
        .save()
        .then(user => {
          res.status(200).send("worked");
        })
        .catch(err => {
          res.status(400).send("update not possible due to " + err);
        });
    }
  });
});

router.route("/select/done/").post(function(req, res) {
  User.findById(req.body.userId, function(err, user) {
    if (!user) res.status(404).send("User not found");
    else {
      user.baldTags = req.body.tags;
      user
        .save()
        .then(user => {
          res.status(200).send("worked");
        })
        .catch(err => {
          res.status(400).send("update not possible due to " + err);
        });
    }
  });
});

router.post("/settings", (req, res) => {
  const {
    firstname,
    lastname,
    bio,
    age,
    gender,
    sexualPreference,
    location,
    id
  } = req.body;

  //Simple validation
  if (
    !firstname ||
    !lastname ||
    !bio ||
    !age ||
    !gender ||
    !sexualPreference ||
    !location
  ) {
    return res.status(400).send("update not possible due to " + err);
  }
  User.findById(id, function(err, user) {
    if (!user) res.status(404).send("not found: " + user);
    else {
      user.firstname = firstname;
      user.lastname = lastname;
      user.bio = bio;
      user.age = age;
      user.gender = gender;
      user.sexualPreference = sexualPreference;
      user.location = location;
      user
        .save()
        .then(user => {
          //
          res.json({ user });
        })
        .catch(err => {
          res.status(400).send("update not possible due to " + err);
        });
    }
  });
});

router.route("/explore/").post(function(req, res) {
  if (req.body.sexualPreference == "other") {
    //add location
    User.find(
      {
        $or: [
          { sexualPreference: req.body.gender },
          { sexualPreference: "other" }
        ],
        location: req.body.location
      },
      function(err, pmatches) {
        if (err) res.send(err);
        else res.json(pmatches);
      }
    );
  } else {
    User.find(
      {
        location: req.body.location,
        sexualPreference: req.body.gender,
        gender: req.body.sexualPreference
      },
      function(err, pmatches) {
        if (err) res.send(err);
        else res.json(pmatches);
      }
    );
  }
});

router.post("/like", (req, res) => {
  const { otherId, likeOrUnlike, id } = req.body;

  console.log(id);
  console.log(otherId);
  User.findById(id, function(err, user) {
    if (!user) res.status(404).send("not found: " + user);
    else {
      if (likeOrUnlike == "like") {
        const arrayLikes = user.likes;
        arrayLikes.push(...[otherId]);
        user.likes = arrayLikes;
        user
          .save()
          .then(user => {
            //
            res.json({ user });
          })
          .catch(err => {
            res.status(400).send("update not possible due to " + err);
          });
      } else {
        const arrayDisLikes = user.dislikes;
        arrayDisLikes.push(...[otherId]);
        user.dislikes = arrayDisLikes;
        user
          .save()
          .then(user => {
            //
            res.json({ user });
          })
          .catch(err => {
            res.status(400).send("update not possible due to " + err);
          });
      }
    }
  });
});


// Messaging Routes

router.get("/messages/all", (req, res) => {
  // displays all messages
  Conversation.find(function(err, conversation) {
    if (err) {
      console.log(err);
    } else {
      res.json(conversation);
    }
  });
});

router.post("/messages/new", (req, res) => {
  // creates a new conversation
  let convo = new Conversation(req.body);
  convo
    .save()
    .then(user => {
      res.status(200).json({ post: "post added succesfully with poop" });
    })
    .catch(err => {
      res.status(400).send("adding new post failed: " + err);
    });
});

router.post("/messages/update", (req, res) => {
  // updates conversation
  const { conversationID } = req.body;
  Conversation.findById(conversationID, function(err, conversation) {
    if (err) {
      console.log(err);
    } else {
      res.json(conversation);
    }
  });
});



router.post("/messages/send", (req, res) => {
  // sends a new message and appends to a conversation
  const { conversationID, userID, message } = req.body;

  Conversation.findById(conversationID, function(err, conversation) {
    if (err) {
      res.status(500).send("message could not send due to " + err);
    } else {
      const arrayMessages = conversation.messages;
      const newMessage = { userID, message };
      arrayMessages.push(newMessage);
      conversation.messages = arrayMessages;
      conversation
        .save()
        .then(conversation => {
          res.json({ conversation });
        })
        .catch(err => {
          res.status(400).send("update not possible due to " + err);
        });
    }
  });
});

module.exports = router;
