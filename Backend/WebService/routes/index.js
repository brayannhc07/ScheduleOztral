'use strict'

/* Controllers */
const usuarioController = require('../controllers/usersController');

const rootPath = 'api/';
const usersPath = 'users/';

module.exports = (app) => {
	// app.get(`/${rootPath}`, (req, res) => res.status(200).send({
	// 	message: 'Example project did not give you access to the api web services',
	// }));
	app.post(`/${rootPath}${usersPath}`, usuarioController.create);
	app.get(`/${rootPath}${usersPath}`, usuarioController.list);
	app.get(`/${rootPath}${usersPath}:id`, usuarioController.find);
};