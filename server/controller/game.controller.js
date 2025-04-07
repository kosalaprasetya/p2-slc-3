const { Game } = require('../models/index');

class GameController {
  static async getGames(req, res, next) {
    try {
      const allGames = await Game.findAll();
      res.status(200).json(allGames);
    } catch (error) {
      next(error);
    }
  }
  static async createGames(req, res, next) {
    try {
      const { name, gameImg, releaseDate, developer, genre } = req.body;
      const { id: UserId } = req.user;
      const result = await Game.create({ name, gameImg, releaseDate, developer, genre, UserId });
      res.status(201).json({
        id: result.id,
        name: result.name,
        gameImg: result.gameImg,
        releaseDate: result.releaseDate,
        developer: result.developer,
        genre: result.genre,
        UserId: result.UserId,
      });
    } catch (error) {
      next(error);
    }
  }
  static async deleteGame(req, res, next) {
    try {
      const { id: gameId } = req.params;
      const game = await Game.findByPk(gameId);
      if (!game) throw { name: 'not found', message: 'Data not found' };
      await Game.destroy({ where: { id: gameId } });
      res.status(200).json({ message: 'Game has been deleted' });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = GameController;
