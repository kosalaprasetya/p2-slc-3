const { verifyToken } = require('../helpers/jwt');

const authentication = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) throw { name: 'unauthorized', message: 'Invalid token' };
  if (authorization.split(' ')[0] !== 'Bearer' || !authorization.split(' ')[1]) throw { name: 'unauthorized', message: 'Invalid token' };
  const token = authorization.split(' ')[1];
  const payload = verifyToken(token);
  if (!payload.id) throw { name: 'unauthorized', message: 'Invalid token' };
  req.user = payload;
  next();
};

module.exports = authentication;
