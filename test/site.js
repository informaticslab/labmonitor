/*eslint-env and, mocha */
'use strict';

process.env.NODE_ENV = 'test';

let mongoose = require('mongoose');
let Site = require('../models/site');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

describe('Sites', () => {

	beforeEach((done) => {
		Site.remove({}, () => {
			done();
		});
	});

	describe('/GET site', () => {
		it('it should GET all the users', (done) => {
			chai.request(server)
				.get('/api/sites')
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('array');
					res.body.length.should.be.eql(0);
					done();
				});
		});
	});

	describe('/POST site', () => {
		it('it should not POST a site without a url', (done) => {
			let site = {
				name: 'IIU Site',
				port: 80,
				host: 'IIU',
				checkInterval: 5,
				timeout: 10000
			};
			chai.request(server)
				.post('/api/sites')
				.send(site)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('errors');
					res.body.errors.should.have.property('url');
					res.body.errors.url.should.have.property('kind').eql('required');
					done();
				});
		});

		it('it should POST a site', (done) => {
			let site = {
				name: 'IIU Site',
				url: 'http://www.phiresearchlab.org',
				port: 80,
				host: 'IIU',
				checkInterval: 5,
				timeout: 10000
			};
			chai.request(server)
				.post('/api/sites')
				.send(site)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('message').eql('Success');
					res.body.site.should.have.property('name');
					res.body.site.should.have.property('url');
					res.body.site.should.have.property('host');
					res.body.site.should.have.property('checkInterval');
					res.body.site.should.have.property('timeout');
					done();
				});
		});
	});
});