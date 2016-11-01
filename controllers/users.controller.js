var User = require('../models/user');

module.exports = function () {
	var service = {
		createUser: createUser,
		getAllUsers: getAllUsers
	};

	return service;

	//////////////////////////////

	function createUser(req, res) {
		var user = new User(req.body);
		user.save(function (err) {
			if (err) {
				res.send(err);
			}
			res.json({ message: 'New user successfully created!' });
		});
	}

	function getAllUsers(req, res) {
		User.find(function (err, users) {
			if (err) {
				res.send(err);
			}
			res.json(users);
		});
	}
};


