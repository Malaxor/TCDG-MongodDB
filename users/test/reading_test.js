
const assert = require('assert');
const User   = require('../src/user');

describe('Reading users out of the database', () => {

	let joe;

	beforeEach((done) => {

		joe = new User({name: 'Joe'});
		joe.save()
		.then(() => done());
	});	

	it('finds all users with the name of Joe', (done) => {

		User.find({ name: 'Joe' })
		.then((users) => {
			assert(users[0]._id.equals(joe._id));
			done();
		});
	});

	it('finds all users with the name of Joe', (done) => {

		User.findOne({ _id: joe._id })
		.then((user) => {
			assert(user.name === 'Joe');
			done();
		});
	});
});