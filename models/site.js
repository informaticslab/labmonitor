var mongoose = require('mongoose');
var moment = require('moment');
var Schema = mongoose.Schema;

var SiteSchema = new Schema({
	name: { type: String, required: true }
});