
const assert   = require('assert');
const mongoose = require('mongoose'); 
const request  = require('supertest');
const app      = require('../../app');
const Driver   = mongoose.model('driver');

describe('Drivers controller', () => {

	it('Post to /drivers creates a new driver', done => {

		Driver.count().then(count => {
			request(app)
			.post('/drivers')
			.send({ email: 'test@test.com '})
			.end(() => {
				Driver.count().then(newCount => {
					assert(count + 1 === newCount);
					done();
				});
			});
		});
	});

    it('PUT to /drivers/id edits an existing driver', done => {

        const driver = new Driver({ email: 'test@update.com', driving: false});

        driver.save().then(() => {
            request(app)
            .put(`/drivers/${driver._id}`)
            .send({driving: true})
            .end(() => {
                Driver.findOne({ email: 'test@update.com' })
                 .then((driver) => {
                    assert(driver.driving === true);
                    done();
                });
            });
        });
	});
	it('DELETE to /drivers/id deletes and existing driver', done => {

		const driver = new Driver({ email: 'test@delete.com' });

		driver.save().then(() => {
			request(app)
			.delete(`/drivers/${driver._id}`)
			.end(() => {
				Driver.findOne({ email: 'test@delete.com' })
				.then((driver) => {
					assert(driver === null);
					done();
				});
			});
		});
	});
});