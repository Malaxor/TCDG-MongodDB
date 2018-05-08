
const express    = require('express');
const app 	     = express();
const routes     = require('./routes/index');
const bodyParser = require('body-parser');
const mongoose   = require('mongoose');

mongoose.Promise = global.Promise;

if(process.env.NODE_ENV !== 'test') {
	mongoose.connect('mongodb://localhost/muber');	
}

app.use(bodyParser.json());
routes(app);
// middleware
app.use((err, req, res, next) => {
	res.status(422).send({ error: err.message });
});

module.exports = app;