//================================================
// Dependencies
//================================================
const mongoose   = require('mongoose');
const PostSchema = require('./post');
const Schema     = mongoose.Schema;
//================================================
// Schema Creation
//================================================
const UserSchema = new Schema({

	name: {
    type: String,
    validate: {
      validator: (name) => name.length > 2,
      message: 'Name must be at least three characters long.'
    },
    required: [true, 'Name is required.']
  },
	posts: [PostSchema],
	likes: Number,
	blogPosts: [{
		type: Schema.Types.ObjectId,
		ref: 'blogPost'
	}]
});
// virtual property
UserSchema.virtual('postCount').get(function() {

  return this.posts.length;
});
// middleware to remove all of a user's blogPosts when the user is removed
UserSchema.pre('remove', function(next) {

  const BlogPost = mongoose.model('blogPost');
  BlogPost.remove({ _id: {$in: this.blogPosts} })
  .then(() => next());
});
//================================================
// Model Creation
//================================================
const User = mongoose.model('user', UserSchema);

module.exports = User;
