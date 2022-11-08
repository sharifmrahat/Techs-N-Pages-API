const errorHandler = (err, req, res, next) => {
  res.send({success: false, error: err.message})
}

module.exports = errorHandler;
