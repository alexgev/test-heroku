module.exports = function (req, res, next) {
  if (req.session.roleName === 'manager') {
    next();
  } else {
    res.forbidden('You don`t have permissions');
  }
};
