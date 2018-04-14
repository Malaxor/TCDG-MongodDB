//================================================
// Dependencies
//================================================
const mongoose   = require("mongoose");
const PostSchema = require('./post');
//================================================
// Schema Creation
//================================================
const UserSchema = new mongoose.Schema({

	name: {

		type: String,
		validate: {
			validator: (name) => name.length > 2,
			message: 'Name must be at least three characters long.'
		},
		required: [true, 'Name is required.']
	},
	posts: [PostSchema],
	likes: Number
});
// added virtual property
UserSchema.virtual('postCount').get(function() {

	return this.posts.length;	
});

//================================================
// Model Creation
//================================================
const User = mongoose.model("User", UserSchema);

module.exports = User;