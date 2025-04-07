const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(1);

const hashPassword = (string) => {
  const hashed = bcrypt.hashSync(string, salt);
  return hashed;
};

const comparePassword = (string, hash) => {
  return bcrypt.compareSync(string, hash);
};

module.exports = { hashPassword, comparePassword };
