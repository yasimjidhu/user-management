const mongoose = require("mongoose");
const schema = mongoose.Schema;
require('./config')
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique:true
  },
  password: {
    type: String,
    required: true,
  },
});
const users = mongoose.model("users", userSchema);

module.exports = users;
