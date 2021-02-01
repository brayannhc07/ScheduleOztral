'use strict'
// Imports
var mysql = require('mysql');
var app = require('./app');

// Config
const port = 3700;

// MySql Connection
var connection = mysql.createConnection({
	host: 'bof3omb3iziyu9mchojp-mysql.services.clever-cloud.com',
	user: 'uzn6al0oo0hkm7wc',
	password: 'AeDRSaUVnZavJODiPlLH',
	database: 'bof3omb3iziyu9mchojp'
});

connection.connect(function (err) {
	if (err) {
		console.error('error connecting: ' + err.stack);
		return;
	}

	console.log("Base de datos conectada con éxito.");

	// Creación del servidor
	app.listen(port, () => {
		console.log("Servidor ejecutándose.");
	});

});