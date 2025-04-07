const UserController = require('../controller/user.controller');

const route = require('express').Router();

route.post('/login', UserController.login);
route.post('/register', UserController.register);

module.exports = route;
