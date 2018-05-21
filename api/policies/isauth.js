module.exports = function (req, res, next) {
  if (req.session.me) {
    next();
  } else {
    res.forbidden('You don`t have permissions');
  }
};
