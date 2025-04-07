const route = require('express').Router();
const usersRoutes = require('./users.routes');
const gamesRoutes = require('./games.routes');
const authentication = require('../middlewares/authentication');

route.get('/', (req, res) => res.send('hello world'));
route.use(usersRoutes);
route.use(authentication);
route.use(gamesRoutes);

module.exports = route;
