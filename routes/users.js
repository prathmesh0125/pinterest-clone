const mongoose = require("mongoose");
const colors = require("colors");
const plm = require("passport-local-mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/PinterestClone").then(() => {
  console.log(`Database connected successfully`.green.bold);
});

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  dp: {
    type: String,
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "post",
    },
  ],
  email: {
    type: String,
    required: true,
    unique: true,
  },
  fullname: {
    type: String,
    required: true,
  },
});
// const userschema=mongoose.Schema({
//   username:String,
// });
userSchema.plugin(plm);

module.exports = mongoose.model("user", userSchema);
