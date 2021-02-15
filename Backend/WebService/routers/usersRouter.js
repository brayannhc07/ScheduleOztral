'use strict'

var router = require('express').Router();

const controller = require('../controllers/usersController');
const path = '/users';

router.get(path, controller.readList);
router.post(path, controller.register);

module.exports = router;