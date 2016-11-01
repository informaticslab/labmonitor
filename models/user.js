var mongoose = require('mongoose');
var moment = require('moment');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	username: { type: String, required: true },
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	created: { type: Date, default: moment() },
	lastLogin: Date,
	isActive: Boolean,
	permissions: Array
});

module.exports = mongoose.model('User', UserSchema);

