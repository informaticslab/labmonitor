'use strict';

const router = require('express').Router();
const users = require('./controllers/users.controller')();
const four0four = require('./utils/404')();

// User Routes
router.post('/users', users.createUser);
router.get('/users', users.getAllUsers);

// 404 catch-all
router.get('/*', four0four.notFoundMiddleware);

module.exports = router;