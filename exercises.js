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

const exerciseSchema = mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    duration: { type: String, required: true },
    date: { type: String, required: true },
  },
  { versionKey: false }
);

exerciseSchema.plugin(uniqueValidator);

const Exercise = mongoose.model("exercises", exerciseSchema);

module.exports = Exercise;
