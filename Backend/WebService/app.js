'use strict'

// imports
const express = require('express');
const bodyParser = require('body-parser');
const rootPath = "/api";
var app = express();

// load routes
const topicRoutes = require('./routes/topicRoutes');
const userRoutes = require('./routes/userRoutes');
// var usersRoutes = require("./routes");

// middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// export routes
app.use(rootPath, userRoutes);
app.use(rootPath, topicRoutes);
app.get('*', (req, res) => {//Home
	res.status(200).send(
		{ message: "API para Schedule Oztral en Node.JS" });
});
// app.use('/api', usersRoutes);
// export
module.exports = app;