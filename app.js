'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/labmonitor');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;

app.use('/api', require('./routes'));
app.use('/', (req, res, next) => {
	res.json({ message: 'API working' });
	next();
});

app.listen(port);
console.log('Magic happens on port ' + port);