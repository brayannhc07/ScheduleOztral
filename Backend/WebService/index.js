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


// MySql Connection 
// var connection = mysql.createConnection({
// 	host: 'bof3omb3iziyu9mchojp-mysql.services.clever-cloud.com',
// 	user: 'uzn6al0oo0hkm7wc',
// 	password: 'AeDRSaUVnZavJODiPlLH',
// 	database: 'bof3omb3iziyu9mchojp'
// });

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

// connection.connect(function (err) {
// 	// if (err) {
// 	// 	console.error('error connecting: ' + err.stack);
// 	// 	return;
// 	// }


// 	console.log("Base de datos conectada con éxito.");

// 	// Creación del servidor
// 	app.listen(port, () => {
// 		console.log("Servidor ejecutándose.");
// 	});

// });