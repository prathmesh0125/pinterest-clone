const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  postText: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  like: {
    type: Array,
    default: [],
  },
});
module.exports = mongoose.model("post", postSchema);
