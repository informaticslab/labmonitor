'use strict';

let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let morgan = require('morgan');
let config = require('config');

//dboptions
let options = {
	server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
	replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
};

mongoose.connect(config.DBHost, options);
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'conneciton error: '));

//don't show the log when it is test
if (config.util.getEnv('NODE_ENV') !== 'test') {
	//use morgan to log at command line
	app.use(morgan('combined')); //'combined' outputs the Apache style LOGs
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


var port = process.env.PORT || 3000;

app.use('/api', require('./routes'));
app.use('/', (req, res, next) => {
	res.json({ message: 'API working' });
	next();
});

app.listen(port);
console.log('Magic happens on port ' + port);