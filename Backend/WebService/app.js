'use strict'

// imports
const express = require('express');
const bodyParser = require('body-parser');
const rootPath = "/api";
var app = express();
// load routes
const usersRouter = require('./routers/usersRouter');
// middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// export routes
app.use(rootPath, usersRouter);
// export
module.exports = app;