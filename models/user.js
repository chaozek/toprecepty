const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: "Name Is Required",
    unique: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: "E-mail Is Required",
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: "Password Is Required",
    unique: true,
  },
  id: { type: String },
});
module.exports = mongoose.model("User", userSchema);
