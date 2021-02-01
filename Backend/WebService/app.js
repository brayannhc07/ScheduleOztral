'use strict'

// imports
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// load routes


// middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors

// export routes
app.get('/', (req, res) => {//Home
	res.status(200).send(
		"<h1>Schedule Oztral</h1><p>Web Service en NodeJs y MySql.</p>");
});
// export
module.exports = app;