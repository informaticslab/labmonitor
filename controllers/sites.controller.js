'use strict';

let Site = require('../models/site');

module.exports = function () {
	let service = {
		createSite: createSite,
		getSites: getSites,
		getSiteById: getSiteById,
		updateSite: updateSite,
		deleteSite: deleteSite
	};

	return service;

	/////////////////////////

	function createSite(req, res) {
		let site = new Site(req.body);
		site.save((err) => {
			if (err) {
				res.send(err);
			} else {
				res.json({ message: 'Success', site });
			}
		});
	}

	function getSites(req, res) {
		Site.find((err, sites) => {
			if (err) {
				res.send(err);
			} else {
				res.json(sites);
			}
		});
	}

	function getSiteById(req, res) {
		Site.findById(req.params.site_id, (err, site) => {
			if (err) {
				res.send(err);
			} else {
				res.json(site);
			}
		});
	}

	function updateSite(req, res) {
		Site.findById(req.params.site_id, (err, site) => {
			if (err) {
				res.send(err);
			} else {
				Object.assign(site, req.body).save((err, site) => {
					if (err) {
						res.send(err);
					} else {
						res.json({ message: 'Site Updated', site });
					}
				});
			}
		});
	}

	function deleteSite(req, res) {
		Site.remove({ _id: req.params.site_id }, (err, result) => {
			if (err) {
				res.send(err);
			} else {
				res.json({ message: 'Site deleted', result });
			}
		});
	}
};