const { Game } = require('../models/index');

const authorization = async (req, res, next) => {
  try {
    const { id: gameId } = req.params;
    const { id: UserId } = req.user;
    const game = await Game.findByPk(gameId);
    if (!game) throw { name: 'not found', message: 'Data not found' };
    if (game.UserId !== UserId) throw { name: 'forbidden', message: 'You are not authorized' };
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authorization;
