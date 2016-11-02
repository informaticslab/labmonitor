/*eslint-env and, mocha */
'use strict';

process.env.NODE_ENV = 'test';

let mongoose = require('mongoose');
let User = require('../models/user');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

// Parent block
describe('Users', () => {
	beforeEach((done) => {
		User.remove({}, () => {
			done();
		});
	});

	describe('/GET user', () => {
		it('it should GET all the users', (done) => {
			chai.request(server)
				.get('/api/users')
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('array');
					res.body.length.should.be.eql(0);
					done();
				});
		});
	});

	describe('/POST user', () => {
		it('it should not POST a user without a password', (done) => {
			let user = {
				username: 'labuser',
				firstName: 'lab',
				lastName: 'user',
				email: 'labuser@cdc.gov'
			};
			chai.request(server)
				.post('/api/users')
				.send(user)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('errors');
					res.body.errors.should.have.property('password');
					res.body.errors.password.should.have.property('kind').eql('required');
					done();
				});
		});

		it('it should POST a user', (done) => {
			let user = {
				username: 'labuser',
				firstName: 'lab',
				lastName: 'user',
				email: 'labuser@cdc.gov',
				password: 'testwiththelab'
			};
			chai.request(server)
				.post('/api/users')
				.send(user)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('message').eql('Success');
					res.body.user.should.have.property('username');
					res.body.user.should.have.property('firstName');
					res.body.user.should.have.property('lastName');
					res.body.user.should.have.property('email');
					res.body.user.should.have.property('password');
					done();
				});
		});
	});

	describe('/GET/:id user', () => {
		it('it should GET a user by the given id', (done) => {
			let user = new User({ username: 'labuser', firstName: 'lab', lastName: 'user', email: 'labuser@cdc.gov', password: 'testwiththelab' });
			user.save((err, user) => {
				chai.request(server)
					.get('/api/users/' + user.id)
					.send(user)
					.end((err, res) => {
						res.should.have.status(200);
						res.body.should.be.a('object');
						res.body.should.have.property('username');
						res.body.should.have.property('firstName');
						res.body.should.have.property('lastName');
						res.body.should.have.property('email');
						res.body.should.have.property('password');
						res.body.should.have.property('_id').eql(user.id);
						done();
					});
			});
		});
	});

	describe('/PUT/:id user', () => {
		it('it should UPDATE a book given the id', (done) => {
			let user = new User({ username: 'labuser', firstName: 'lab', lastName: 'user', email: 'labuser@cdc.gov', password: 'testwiththelab' });
			user.save((err, user) => {
				chai.request(server)
					.put('/api/users/' + user.id)
					.send({ username: 'labuser', firstName: 'lab', lastName: 'admin', email: 'labadmin@cdc.gov', password: 'testwiththelab' })
					.end((err, res) => {
						res.should.have.status(200);
						res.body.should.be.a('object');
						res.body.should.have.property('message').eql('User updated!');
						res.body.user.should.have.property('lastName').eql('admin');
						res.body.user.should.have.property('email').eql('labadmin@cdc.gov');
						done();
					});
			});
		});
	});

	describe('/DELETE/:id user', () => {
		it('it should DELETE a user given the id', (done) => {
			let user = new User({ username: 'labuser', firstName: 'lab', lastName: 'user', email: 'labuser@cdc.gov', password: 'testwiththelab' });
			user.save((err, user) => {
				chai.request(server)
					.delete('/api/users/' + user.id)
					.end((err, res) => {
						res.should.have.status(200);
						res.body.should.be.a('object');
						res.body.should.have.property('message').eql('User successfully deleted');
						res.body.result.should.have.property('ok').eql(1);
						res.body.result.should.have.property('n').eql(1);
						done();
					});
			});
		});
	});

});