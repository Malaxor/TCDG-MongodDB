
const express    = require('express');
const app 	     = express();
const routes     = require('./routes/index');
const bodyParser = require('body-parser');
const mongoose    = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/muber');

app.use(bodyParser.json());
routes(app);

module.exports = app;