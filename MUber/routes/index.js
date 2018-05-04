
const driversController = require('../controllers/drivers_controller');

module.exports = (app) => {

	// INDEX
	app.get('/', driversController.greeting);

	// CREATE
	app.post('/drivers', driversController.create);
};