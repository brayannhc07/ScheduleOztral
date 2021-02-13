'use strict'

// imports
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// load routes
// var usersRoutes = require("./routes");

// middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors
// Configurar cabeceras y cors
// app.use((req, res, next) => {
// 	res.header('Access-Control-Allow-Origin', '*');
// 	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
// 	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
// 	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
// 	next();
// });
require('./routes')(app);
// export routes
app.get('*', (req, res) => {//Home
	res.status(200).send(
		"<h1>Schedule Oztral</h1><p>Web Service en NodeJs y MySql.</p>");
});
// app.use('/api', usersRoutes);
// export
module.exports = app;