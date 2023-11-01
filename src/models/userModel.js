const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  name: String,
  admin: { type: Boolean, default: false },
  email: String,
  password: String,
});

const UserModel = model("user", UserSchema);

module.exports = UserModel;
