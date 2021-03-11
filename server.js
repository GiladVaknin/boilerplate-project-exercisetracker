const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const User = require("./users");
const urlencodedParser = bodyParser.urlencoded({ extended: false });

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
    response.send(users);
  });
});

// app.post("/api/exercise/add", (request, response) => {});

// app.get("/api/exercise/log", (request, response) => {});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
