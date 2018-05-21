module.exports = function (req, res, next) {
  if (req.param('id')) {
    next();
  } else {
    res.badRequest('Id is required');
  }
};
