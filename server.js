const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const http = require("http");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const path = require('path');

const app = express();
// Bodyparser Middleware
app.use(express.json());

// DB Config
const db = config.get("mongoURI");

// Connect to Mongo
mongoose
  .connect( process.env.MONGODB_URI || db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected..."))
  .catch(err => console.log(err));

//Use Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/posts", require("./routes/api/posts"));

//Deploying to Heroku
const port = process.env.PORT || 5000;

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.join(_dirname, 'client', 'build', 'index.html'));
  })
}

server = app.listen(port, () => console.log(`Server started on port ${port}`));
