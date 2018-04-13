
const assert = require('assert');
const User   = require('../src/user');

describe('Validating records', () => {

	it('requires a user name', () => {

		const user = new User({ name: undefined });
		const validationResult = user.validateSync();
		const {message} = validationResult.errors.name;
		assert(message === 'Name is required.');
	});

	it('requires a name longer than two characters', () => {

		const user = new User({ name: 'Al'});
		const validationResult = user.validateSync();
		const {message} = validationResult.errors.name;
		assert(message === 'Name must be at least three characters long.');
	});

	it('disallows invalid records from being saved', (done) => {

		const user = new User({ name: 'Al'});
		user.save()
		.catch((validationResult) => {
			const {message} = validationResult.errors.name;
			assert(message === 'Name must be at least three characters long.');
			done();
		});
	});
});