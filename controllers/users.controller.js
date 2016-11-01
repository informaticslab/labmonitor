'use strict';

const User = require('../models/user');

module.exports = function () {
	let service = {
		createUser: createUser,
		getAllUsers: getAllUsers,
		getUserById: getUserById,
		updateUser: updateUser,
		deleteUser: deleteUser
	};

	return service;

	//////////////////////////////

	function createUser(req, res) {
		var user = new User(req.body);
		user.save((err) => {
			if (err) {
				res.send(err);
			} else {
				res.json({ message: 'Success', user });
			}
		});
	}

	function getAllUsers(req, res) {
		User.find((err, users) => {
			if (err) {
				res.send(err);
			} else {
				res.json(users);
			}

		});
	}

	function getUserById(req, res) {
		User.findById(req.params.user_id, (err, user) => {
			if (err) {
				res.send(err);
			} else {
				res.json(user);
			}

		});
	}

	function updateUser(req, res) {
		User.findById(req.params.user_id, (err, user) => {
			if (err) {
				res.send(err);
			} else {
				Object.assign(user, req.body).save((err, user) => {
					if (err) {
						res.send(err);
					} else {
						res.json({ message: 'User updated!', user });
					}
				});
			}

		});
	}

	function deleteUser(req, res) {
		User.remove({ _id: req.params.user_id }, (err, result) => {
			if (err) {
				res.send(err);
			} else {
				res.json({ message: 'User successfully deleted', result });
			}
		});
	}
};


