'use strict'

var router = require('express').Router();

const controller = require('../controllers/usersController');
const path = '/users';

router.put(path + "/:id", controller.updateProfile);
router.patch(path + "/:id", controller.changePassword);

module.exports = router;