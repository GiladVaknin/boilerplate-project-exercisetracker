const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const User = require("./users");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const Exercise = require("./exercises");
// const { findById } = require("./users");

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

app.post("/api/exercise/add", async (request, response) => {
  const id = request.body.userId;
  let date;
  if (request.body.date === "") {
    date = new Date();
  } else {
    date = new Date(request.body.date);
  }
  const userLog = await User.findById(id).then((user) => {
    return user.log;
  });
  userLog.unshift({
    duration: Number(request.body.duration),
    description: request.body.description,
    date: date.toDateString(),
  });
  User.findByIdAndUpdate(
    id,
    {
      log: userLog,
    },
    { new: true }
  )
    .then((updatedUser) => {
      const newUserUpdate = {
        username: updatedUser.username,
        _id: updatedUser.id,
        date: updatedUser.log[0].date,
        duration: updatedUser.log[0].duration,
        description: updatedUser.log[0].description,
      };
      response.json(newUserUpdate);
    })
    .catch((error) => error);
});

app.get(`/api/exercise/log`, (request, response) => {
  let id = request.query.userId;
  console.log(id);
  User.findById(id).then((user) => {
    console.log(user);
    response.json(user);
  });
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
