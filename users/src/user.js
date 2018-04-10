//================================================
// Dependencies
const mongoose = require("mongoose");
// Schema Creation
const UserSchema = new mongoose.Schema({

	name: String
});
// Model Creation
const User = mongoose.model("User", UserSchema);

module.exports = User;