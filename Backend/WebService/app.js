'use strict'

// imports
const express = require('express');
const bodyParser = require('body-parser');
const auth = require('./middlewares/auth');
const rootPath = "/api";

var app = express();
// load routes
const usersRouter = require('./routers/usersRouter');
const profileRouter = require('./routers/profileRouter');
// middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// export routes
app.use(rootPath, usersRouter);
app.use(auth);// Autorización necesaria
app.use(rootPath, profileRouter);

// export
module.exports = app;