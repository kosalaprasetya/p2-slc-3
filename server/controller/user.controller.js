const { User } = require('../models/index');
const { comparePassword } = require('../helpers/bcrypt');
const { signToken } = require('../helpers/jwt');

class UserController {
  static async register(req, res, next) {
    try {
      const { email, name, password } = req.body;
      const result = await User.create({ email, name, password });
      res.status(201).json({
        id: result.id,
        name: result.name,
        email: result.email,
      });
    } catch (error) {
      next(error);
    }
  }
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) throw { name: 'bad request', message: 'Email is required' };
      if (!password) throw { name: 'bad request', message: 'Password is required' };

      const user = await User.findOne({ where: { email: email } });
      if (!user) throw { name: 'unauthorized', message: 'Invalid email/password' };
      const isPasswordMatch = comparePassword(password, user.password);
      if (!isPasswordMatch) throw { name: 'unauthorized', message: 'Invalid email/password' };

      const token = signToken({ email: user.email, id: user.id });

      res.status(200).json({ access_token: token });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
