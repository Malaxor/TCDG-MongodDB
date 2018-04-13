//================================================
// Dependencies
const mongoose = require("mongoose");
// Schema Creation
const UserSchema = new mongoose.Schema({

	name: {
		type: String,
		validate: {
			validator: (name) => name.length > 2,
			message: 'Name must be at least three characters long.'
		},
		required: [true, 'Name is required.']
	},
	postCount: Number
});
// Model Creation
const User = mongoose.model("User", UserSchema);

module.exports = User;