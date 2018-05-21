/**
 * PermissionController
 *
 * @description :: Server-side logic for managing permissions
 * @help        :: See http:
 */
module.exports = {
  index: function (req, res, next) {
    Permission.find().exec(function (err, permissions) {
      if (err) return res.serverError(err);
      res.send(permissions);
    })
  }
};
