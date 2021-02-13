'use strict'
// Imports
// var mysql = require('mysql');
var Sequelize = require('sequelize');
var app = require('./app');

// Config
const port = 3700;

// MySql Connection with Sequeliza
const sequelize = new Sequelize('schedule_oztral', 'root', '', {
	host: 'localhost',
	dialect: 'mysql'/* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
});



try {
	sequelize.authenticate();
	console.log('Connection has been established successfully.');
	console.log("Base de datos conectada con éxito.");

	// Creación del servidor
	app.listen(port, () => {
		console.log("Servidor ejecutándose.");
	});
} catch (error) {
	console.error('Unable to connect to the database:', error);
}
