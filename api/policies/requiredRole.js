module.exports = function (req, res, next) {
  if (req.param('role')) {
    next();
  } else {
    res.badRequest('Role is required');
  }
};
