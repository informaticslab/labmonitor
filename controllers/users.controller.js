'use strict';

const User = require('../models/user');

module.exports = function () {
	let service = {
		createUser: createUser,
		getAllUsers: getAllUsers
	};

	return service;

	//////////////////////////////

	function createUser(req, res) {
		var user = new User(req.body);
		user.save((err) => {
			if (err) {
				res.send(err);
			}
			res.json({ message: 'New user successfully created!' });
		});
	}

	function getAllUsers(req, res) {
		User.find((err, users) => {
			if (err) {
				res.send(err);
			}
			res.json(users);
		});
	}
};


