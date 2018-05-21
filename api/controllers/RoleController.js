/**
 * RoleController
 *
 * @description :: Server-side logic for managing roles
 * @help        :: See http:
 */
module.exports = {
  index: function (req, res, next) {
    Role.find().exec(function foundInfo(err, roles) {
      if (err) return res.serverError(err);
      res.send(roles);
    });
  },
  addPermission: function (req, res, next) {
    if (!req.param('id')) return res.badRequest('id is required')
    Role.findOne(req.param('id')).exec(function (err, role) {
      if (err) return res.serverError(err);
      if (!role) return res.notFound('Role with id "' + req.param('id') + '" not found');
      role.permissions.add(HandlerService.toArrayOfIds(req.param('permissions')))
      role.save(function (err) {
        if (err) return res.serverError(err);
        Role.findOne(role.id).populate('permissions').exec(function (err, role) {
          if (err) return res.serverError(err);
          res.send(role);
        })
      })
    })
  },


};
