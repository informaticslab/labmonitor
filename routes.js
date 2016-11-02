'use strict';

let router = require('express').Router();
let users = require('./controllers/users.controller')();
let sites = require('./controllers/sites.controller')();
let four0four = require('./utils/404')();

// User Routes
router.route('/users')
	.get(users.getAllUsers)
	.post(users.createUser);

router.route('/users/:user_id')
	.get(users.getUserById)
	.delete(users.deleteUser)
	.put(users.updateUser);

// Sites Routes
router.route('/sites')
	.get(sites.getSites)
	.post(sites.createSite);

router.route('/sites/:site_id')
	.get(sites.getSiteById)
	.delete(sites.deleteSite)
	.put(sites.updateSite);

// 404 catch-all
router.get('/*', four0four.notFoundMiddleware);

module.exports = router;