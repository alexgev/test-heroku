var CollaboratorService = {
  findMy: function (req) {
    return new Promise(function (resolve, reject) {
      if (!req || !req.session || !req.session.collaborator) return reject(new Error('Data of the session have been expired'));

      var collaboratorId = req.session.collaborator;
      Collaborator.findOne(collaboratorId)
        .populate('organization')
        .populate('role')


        .populate('user')
        .exec(function (err, collaborator) {
          if (err) return reject(err);

          if (!collaborator) return reject(HandlerService.notFound('Collaborator', collaborator.organization.id));

          if (!collaborator.organization || !collaborator.organization.id) {
            return reject('The organization of this collaborator was not found');
          }
          else if (!collaborator.role || !collaborator.role.id) {
            return reject('The position of this collaborator is not identified');
          }
          async.series([
            function (cb) {

              Role.findOne(collaborator.role.id)
                .populate('permissions')
                .populate('statuses').exec(function (err, role) {
                if (err) return cb(err);
                collaborator.permissions = {};
                collaborator.statuses = {};
                role.permissions.forEach(function (permission) {
                  collaborator.permissions[permission.name] = true;
                });
                role.statuses.forEach(function (permission) {
                  collaborator.statuses[permission.name] = true;
                });
                cb();
              });
            },
          ], function (err) {
            if (err) return reject(err);
            req.session.collaborator = collaborator.id;
            req.session.organization = collaborator.organization.id;
            req.session.permissions = collaborator.permissions;
            req.session.role = collaborator.role.id;
            req.session.roleName = collaborator.role.name;
            resolve(collaborator);
          });
        });
    });
  },
}
module.exports = CollaboratorService;
