const errorManagement = (err, req, res, next) => {
  console.log('<<<<<<<<<<<<<<<< ERROR HANDLER >>>>>>>>>>>>>>>>>>>>>');
  if (err.name === 'SequelizeUniqueConstraintError' || err.name === 'SequelizeValidationError') {
    res.status(400).json({ message: err.errors[0].message });
  }
  if (err.name === 'bad request') {
    res.status(400).json({ message: err.message });
  }
  if (err.name === 'unauthorized') {
    res.status(401).json({ message: err.message });
  }
  if (err.name === 'forbidden') {
    res.status(403).json({ message: err.message });
  }
  if (err.name === 'not found') {
    res.status(404).json({ message: err.message });
  }
  res.status(500).json({ message: 'Internal server error', error: err });
  res.send(err);
  console.log(err);

  next();
};

module.exports = errorManagement;
