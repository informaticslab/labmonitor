'use strict';

const mongoose = require('mongoose');
const moment = require('moment');
const Schema = mongoose.Schema;

var SiteSchema = new Schema({
	name: { type: String, required: true }
});