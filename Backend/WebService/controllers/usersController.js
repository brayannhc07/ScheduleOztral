const Sequelize = require('sequelize');
const users = require('../models').users;
module.exports = {
	create(req, res) {
		console.log(req.params);
		console.log(req.body);
		return users
			.create({
				login_name: req.body.login_name,
				password: req.body.password,
				first_name: req.body.first_name,
				last_name: req.body.last_name,
				status: req.body.status
			})
			.then(users => res.status(200).send(users))
			.catch(error => res.status(400).send(error))
	},
	list(_, res) {
		return users.findAll({})
			.then(users => res.status(200).send(users))
			.catch(error => res.status(400).send(error))
	},
	find(req, res) {
		return users.findAll({
			where: {
				id: req.params.id,
			}
		})
			.then(users => res.status(200).send(users))
			.catch(error => res.status(400).send(error))
	},
};