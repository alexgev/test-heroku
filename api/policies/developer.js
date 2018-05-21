module.exports = function (req, res, next) {
  if (req.session.roleName == 'developer') {
    next();
  } else {
    res.forbidden('You don`t have permissions');
  }
};
