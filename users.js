require("dotenv").config();
const mongoose = require("mongoose");
const url = process.env.MONGODB_URI;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const userSchema = mongoose.Schema(
  {
    username: { type: String, required: true },
  },
  { versionKey: false }
);

const User = mongoose.model("users", userSchema);

module.exports = User;
