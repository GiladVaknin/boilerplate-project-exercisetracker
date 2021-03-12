const mongoose = require("mongoose");
const url = process.env.MONGODB_URI;
const uniqueValidator = require("mongoose-unique-validator");

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  date: { type: String },
  duration: { type: Number },
  description: { type: String },
  log: [{}],
});

userSchema.plugin(uniqueValidator);
userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("User", userSchema);
