const GameController = require('../controller/game.controller');
const authorization = require('../middlewares/authorization');

const route = require('express').Router();

route.get('/games', GameController.getGames);
route.post('/games', GameController.createGames);
route.delete('/games/:id', authorization, GameController.deleteGame);

module.exports = route;
