const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const User = require("./users");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const Exercise = require("./exercises");
const { findById } = require("./users");

app.use(express.json());
app.use(urlencodedParser);
app.use(cors());
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.post("/api/exercise/new-user", (request, response) => {
  const username = request.body.username;

  const user = new User({
    username,
  });

  user
    .save()
    .then((savedUser) => savedUser.toJSON())
    .then((savedAndFormattedUser) => {
      response.json(savedAndFormattedUser);
    })
    .catch((error) => error);
});

app.get("/api/exercise/users", (request, response) => {
  User.find({}).then((users) => {
    response.json(users);
  });
});

app.post("/api/exercise/add", (request, response) => {
  const id = request.body.userId;
  const description = request.body.description;
  const duration = request.body.duration;
  const date = request.body.date || new Date();
  const exercise = new Exercise({
    userId: id,
    description: description,
    duration: duration,
    date: date,
  });

  const user = User.findById(id);
  exercise
    .save()
    .then((savedExercise) => savedExercise.toJSON())
    .then((savedAndFormattedExercise) => {
      const addedExercise = {
        _id: id,
        userName: user.username,
        date: date.toDateString(),
        duration: duration,
        description: description,
      };
      response.json(addedExercise);
    })
    .catch((error) => error);
});

// app.get("/api/exercise/log", (request, response) => {});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
