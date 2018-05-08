
const driversController = require('../controllers/drivers_controller');

module.exports = (app) => {

	// INDEX
	app.get('/drivers', driversController.index);

	// CREATE
	app.post('/drivers', driversController.create);

	// EDIT
	app.put('/drivers/:id', driversController.edit);

	// DELETE
	app.delete('/drivers/:id', driversController.delete);

	// GREETING
	app.get('/', driversController.greeting);
};