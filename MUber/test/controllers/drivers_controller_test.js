
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
	it('GET to /drivers find drivers in a location', done => {

		const seattleDriver = new Driver(
		{ 
			email: 'seattle@test.com', 
			geometry: { 
				type: 'Point', 
				coordinates: [-122.47559902, 47.6147628]
			}
		});
		const miamiDriver = new Driver(
		{ 
			email: 'miami@test.com', 
			geometry: { 
				type: 'Point', 
				coordinates: [-80.253, 25.791]
			}
		});
		Promise.all([seattleDriver.save(), miamiDriver.save()])
		.then(() => {
			request(app)
			.get('/drivers?lng=-80&lat=25')
			.end((err, res) => {
				assert(res.body.length === 1);
				assert(res.body[0].obj.email === 'miami@test.com');
				done();
			});
		});
	});
});