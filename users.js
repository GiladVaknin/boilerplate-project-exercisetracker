require("dotenv").config();
const mongoose = require("mongoose");
const url = process.env.MONGODB_URI;
const uniqueValidator = require("mongoose-unique-validator");

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

userSchema.plugin(uniqueValidator);

const User = mongoose.model("users", userSchema);

module.exports = User;
