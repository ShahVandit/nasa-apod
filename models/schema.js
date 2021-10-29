const mongoose = require("mongoose");

const schema = mongoose.Schema({
  date: {
    type: Date,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  explanation: {
    type: String,
    required: true,
  },
  media_type: {
    type: String,
    required: true,
  },
  imgloc: {
    type: String,
  },

  url: {
    type: String,
    required: true,
  },
});

const details = mongoose.model("Details", schema);
module.exports = details;
