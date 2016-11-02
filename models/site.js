'use strict';

const mongoose = require('mongoose');
const moment = require('moment');
const Schema = mongoose.Schema;

var SiteSchema = new Schema({
	name: { type: String, required: true },
	url: { type: String, required: true },
	port: { type: String, required: true },
	host: { type: String, required: true },
	created: { type: Date, default: moment() },
	checkInterval: { type: Number, required: true },
	timeout: { type: Number, required: true },
	monitor: { type: Object, default: {} }
});

module.exports = mongoose.model('Site', SiteSchema);