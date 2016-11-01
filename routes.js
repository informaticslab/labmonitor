'use strict';

let router = require('express').Router();
let users = require('./controllers/users.controller')();
let four0four = require('./utils/404')();

// User Routes
router.post('/users', users.createUser);
router.get('/users', users.getAllUsers);
router.get('/users/:user_id', users.getUserById);
router.delete('/users/:user_id', users.deleteUser);
router.put('/users/:user_id', users.updateUser);

// Sites Routes

// 404 catch-all
router.get('/*', four0four.notFoundMiddleware);

module.exports = router;