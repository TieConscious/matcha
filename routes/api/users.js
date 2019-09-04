const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const config = require("config");
const jwt = require("jsonwebtoken");
const emailPass = require("../../config/keys").emailPass;
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
    console.log("something is missing...");
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  // Check for existing user
  User.findOne({ email }).then(user => {
    if (user) {
      console.log("email already exists");
      return res.status(400).json({ msg: "Email already registered" });
    }
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
          res.status(200).send(user);
        })
        .catch(err => {
          res.status(400).send("update not possible due to " + err);
        });
    }
  });
});

// Change user settings
router.post("/settings", (req, res) => {
  const {
    firstname,
    lastname,
    bio,
    age,
    gender,
    sexualPreference,
    location,
    id,
    password
  } = req.body;

  //Simple validation
  if (!firstname || !lastname || !bio || !age || !gender || !sexualPreference) {
    return res.status(400).send("update not possible due to " + err);
  }
  User.findById(id, async function(err, user) {
    if (!user) res.status(404).send("not found: " + user);
    else {
      user.firstname = firstname;
      user.lastname = lastname;
      user.bio = bio;
      user.age = age;
      user.gender = gender;
      user.sexualPreference = sexualPreference;
      user.location = location;
      if (password != "") {
        // Create salt & hash
        await bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(password, salt, (err, hash) => {
            if (err) throw err;
            user.password = hash;
            user.save();
          });
        });
      }
      user
        .save()
        .then(user => {
          res.json({ user });
        })
        .catch(err => {
          res.status(400).send("update not possible due to " + err);
        });
    }
  });
});

// Display other users for user to like
router.route("/explore/").post(function(req, res) {
  if (req.body.sexualPreference == "other") {
    //add location
    User.find(
      {
        $or: [
          { sexualPreference: req.body.gender },
          { sexualPreference: "other" }
        ]
      },
      function(err, pmatches) {
        if (err) res.send(err);
        else res.json(pmatches);
      }
    );
  } else {
    User.find(
      {
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

// Like a user and notify them that they were liked
// If both users like each other, start a conversation and notify
// both parties that they matched
router.post("/like", (req, res) => {
  const { otherId, likeOrUnlike, id } = req.body;
  User.findById(id, async function(err, user) {
    if (!user) res.status(404).send("not found: " + err);
    else {
      if (likeOrUnlike == "like") {
        const arrayLikes = user.likes;
        arrayLikes.push(...[otherId]);
        user.likes = arrayLikes;
        var firstUser = user;
        var convoArray;
        var notificationType = "like";
        var from = id;
        const likeNotif = { notificationType, from };
        // Logic to check if other user likes back
        await User.findById(otherId, function(err, user) {
          if (!user || err) console.log(err);
          else {
            // If both users like each other
            if (user.likes.includes(id)) {
              // Logic to start new conversation for both parties
              const participants = [id, otherId];
              const convo = new Conversation({ participants });
              convo.save();
              convoArray = user.conversations;
              convoArray.push(convo._id);
              user.conversations = convoArray;
              convoArray = firstUser.conversations;
              convoArray.push(convo._id);
              firstUser.conversations = convoArray;
              // Logic to notify both parties
              var notifArray = user.notifications;
              notifArray.push(likeNotif);
              notificationType = "match";
              var matchNotif = { notificationType, from };
              notifArray.push(matchNotif);
              user.notifications = notifArray;
              from = otherId;
              matchNotif = { notificationType, from };
              notifArray = firstUser.notifications;
              notifArray.push(matchNotif);
              firstUser.notifications = notifArray;
              user.save();
            }
            // If the other user does not like you back
            else {
              var notifArray = user.notifications;
              notifArray.push(likeNotif);
              user.notifications = notifArray;
              user.save();
            }
          }
        });
        user = firstUser;
        user
          .save()
          .then(user => {
            //
            res.json({ user });
          })
          .catch(err => {
            console.log(err);
          });
      } else if (likeOrUnlike == "dislike") {
        const arrayDisLikes = user.dislikes;
        arrayDisLikes.push(...[otherId]);
        user.dislikes = arrayDisLikes;
        if (user.likes.includes(otherId)) {
          let index = user.likes.indexOf(otherId);
          user.likes.splice(index, 1);
        }
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
        const arrayBlocked = user.blocked;
        arrayBlocked.push(...[otherId]);
        user.blocked = arrayBlocked;
        user
          .save()
          .then(user => {
            //
            console.log(user.blocked);
            res.json({ user });
          })
          .catch(err => {
            res.status(400).send("update not possible due to " + err);
          });
      }
    }
  });
});

router.post("/famerate", (req, res) => {
  const { otherId, likeOrUnlike } = req.body;
  User.findById(otherId, function(err, user) {
    if (!user) res.status(404).send("not found other user" + err);
    else {
      if (likeOrUnlike == "like") {
        user.fameRate += 1;
        user
          .save()
          .then(user => {
            res.json("populatity increased");
          })
          .catch(err => {
            res.status(400).send("update not possible due to " + err);
          });
      } else {
        user.fameRate -= 1;
        user
          .save()
          .then(user => {
            res.json("populatity decreased");
          })
          .catch(err => {
            res.status(400).send("update not possible due to " + err);
          });
      }
    }
  });
});

// <<-------------------------------------------------------------------------------------->>
// Notification Routes
// Notify user that their profile has been viewed
router.post("/notify/viewed", (req, res) => {
  const { otherId, id } = req.body;
  var from = id;
  User.findById(otherId, function(err, user) {
    if (!user || err) {
      console.log(err);
    } else {
      var notificationType = "viewed";
      const viewNotif = { notificationType, from };
      var notifArray = user.notifications;
      notifArray.push(viewNotif);
      user.notifications = notifArray;
      user
        .save()
        .then(user => {
          res.json("notification sent");
        })
        .catch(err => {
          res.status(400).send("update not possible due to " + err);
        });
    }
  });
});

// Get all users from notifications based on id
// Create an array of notifications and the users that sent them
router.post("/notify/getNotificationArray", (req, res) => {
  var newNotifArray = [];
  var userArray = [];
  for (var i = 0; i < req.body.length; i++) {
    userArray.push(req.body[i].from);
  }

  User.find({ _id: { $in: userArray } }).then(users => {
    newNotifArray = users;
    res.json(newNotifArray);
  });
});

router.post("/notify/updateNotifications", (req, res) => {
  // updates conversation
  const { id } = req.body;
  User.findById(id, function(err, user) {
    if (err) {
      console.log(err);
    } else {
      var notifications = user.notifications;
      res.json(notifications);
    }
  });
});

// Kill all notifications
router.post("/notify/clearNotifications", (req, res) => {
  // updates conversation
  const { id } = req.body;
  User.findById(id, function(err, user) {
    if (err) {
      console.log(err);
    } else {
      user.notifications = [];
      user
        .save()
        .then(user => {
          res.json(user.notifications);
        })
        .catch(err => {
          res.status(400).send("update not possible due to " + err);
        });
    }
  });
});

// <<-------------------------------------------------------------------------------------->>
// Messaging Routes
// View all messages
router.get("/messages/all", (req, res) => {
  // displays all messages
  Conversation.find(function(err, conversation) {
    if (err) {
      console.log(err);
    } else {
      res.json({ conversation });
    }
  });
});

//Create new conversation
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

router.post("/messages/retrieve", (req, res) => {
  // gets all conversations from user
  const { conversations } = req.body;

  Conversation.find({ _id: { $in: conversations } }, function(
    err,
    conversation
  ) {
    if (err) {
      console.log(err);
    } else {
      res.json(conversation);
    }
  });
});

router.post("/messages/sendNewMessage", (req, res) => {
  // sends a new message and appends to a conversation
  const { conversationID, sender, message } = req.body;

  Conversation.findById(conversationID, async function(err, conversation) {
    if (err) {
      res.status(500).send("message could not send due to " + err);
    } else {
      // Logic for sending a new message
      const arrayMessages = conversation.messages;
      const newMessage = { sender, message };
      arrayMessages.push(newMessage);
      conversation.messages = arrayMessages;
      // Logic for sending notification to user when they receive a message
      var otherId;
      if (conversation.participants[0] == sender)
        otherId = conversation.participants[1];
      else otherId = conversation.participants[0];

      await User.findById(otherId, function(err, user) {
        if (!user || err) {
          console.log(err);
        } else {
          var notificationType = "message";
          var from = sender;
          const messageNotif = { notificationType, from };
          var notifArray = user.notifications;
          notifArray.push(messageNotif);
          user.notifications = notifArray;
          user.save();
        }
      }).catch(function(err) {
        res.send({ error: err });
      });
      conversation
        .save()
        .then(conversation => {
          res.json(conversation);
        })
        .catch(err => {
          res.status(400).send("update not possible due to " + err);
        });
    }
  });
});

// Get all users from messages based on id
// Create an array of users that sent them
router.post("/messages/getChattersArray", (req, res) => {
  var newChattersArray = [];
  var userArray = [];
  for (var i = 0; i < req.body.length; i++) {
    userArray.push(req.body[i].participants[0]);
    userArray.push(req.body[i].participants[1]);
  }
  User.find({ _id: { $in: userArray } }).then(users => {
    newChattersArray = users;
    res.json(newChattersArray);
  });
});


// Add picture to user's profile
router.post("/pictureadd", (req, res) => {
  const { id, data } = req.body;
  User.findById(id, function(err, user) {
    if (err) {
      res.status(500).send("img not updated:" + err);
    } else {
      let media = user.media;
      console.log("-----------");
      console.log(media);
      if (media.length < 5) {
        media.push(data);
        user.media = media;
        user
          .save()
          .then(user => {
            res.json(user);
          })
          .catch(err => {
            res.status(400).send("update not possible due to " + err);
          });
      } else res.status(400).send("update not possible: MAX 5");
    }
  });
});

router.post("/pictureaddemail", (req, res) => {
  // sends a new message and appends to a conversation
  const { email, data } = req.body;
  User.find({ email: email }, function(err, user) {
    if (err) {
      console.log(err);
      res.status(500).send("img not updated:" + err);
    } else {
      console.log("-----------");
      console.log(user);
      console.log("USER MEDIA: " + user[0].media);
      user[0].media.unshift(data);
      user[0]
        .save()
        .then(user => {
          res.json(user);
          console.log(user[0].media);
        })
        .catch(err => {
          res.status(400).send("update not possible due to " + err);
        });
    }
  });
});

router.post("/email", (req, res) => {
  let from = "baldmatcha@gmail.com";
  let to = req.body.to;
  let subject = req.body.subject;
  let text = req.body.text;
  let id = req.body.id;
  if (req.body.subject == "validate") {
    text += "https://localhost:3000/api/users/validate/" + id + "5789";
  }
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: from,
      pass: emailPass
    }
  });

  var mailoptions = {
    from: from,
    to: to,
    subject: subject,
    text: text
  };
  transporter.sendMail(mailoptions, function(err, info) {
    if (err) console.log(err);
    else console.log("email sent: " + info.response);
  });
  res.send("worked");
});

router.post("/validate/:id", (req, res) => {
  // sends a new message and appends to a conversation
  console.log("validating...");
  let id = req.body.id;
  User.findById(id, function(err, user) {
    if (err) {
      res.status(404).send("validation not updated:" + err);
    } else {
      user.isValidated = true;
      console.log("doing it...");
      user
        .save()
        .then(user => {
          res.json(user);
        })
        .catch(err => {
          res.status(400).send("update not possible due to " + err);
        });
    }
  });
});

router.post("/forgot", function(req, res) {
  let email = req.body.email;
  console.log("EMAAAAIL: " + email);
  User.findOne({ email: new RegExp(email) }, function(err, user) {
    if (err) res.send("err: " + err);
    else if (user != null) {
      console.log(user);
      let temp = "859746521temporary" + Math.floor(Math.random() * 10000 + 1);
      let psswd = bcrypt.hashSync(temp, 10, function(err, hash) {
        if (err) res.send("err hashing: " + err);
      });
      user.password = psswd;
      user
        .save()
        .then(user => {
          res.send(temp);
        })
        .catch(err => {
          res.status(400).send("update not possible due to " + err);
        });
    }
  });
});

module.exports = router;
