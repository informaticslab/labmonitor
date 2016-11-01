var router = require('express').Router();
var users = require('./controllers/users')();
var four0four = require('./utils/404')();

// User Routes
router.post('/users', users.createUser);
router.get('/users', users.getAllUsers);



// 404 catch-all
router.get('/*', four0four.notFoundMiddleware);

module.exports = router;