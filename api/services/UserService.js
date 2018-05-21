var UserService = {
  parseReq: function (req) {
    var params = req.params.all();
    var obj = {};
    if (params.name) obj.name = params.name;
    if (params.email) obj.email = params.email;
    if (params.active) obj.active = params.active;
    if (!params.active) obj.active = false;
    return obj;
  },
  defineUsers: function (users) {
    return new Promise(function (resolve, reject) {
      var usersId = HandlerService.toArray(users);
      User.find(usersId).exec(function (err, users) {
        if (err) return reject(err);
        resolve(HandlerService.toArray(users));
      })
    })
  },
  setPassword: function (password) {
    return new Promise(function (resolve, reject) {
      Passwords.encryptPassword({
        password: password,
        difficulty: 10,
      }).exec({
        error: function (err) {
          reject(err);
        },
        success: function (encryptedPassword) {
          resolve(encryptedPassword);
        }
      });
    })
  },
  authorized: function (req, user) {
    return new Promise(function (resolve, reject) {
      req.session.me = user.id;
      delete user.encryptedPassword;
      if (user.currentCollaborator) req.session.collaborator = user.currentCollaborator
      else if (user.collaborators && user.collaborators.length > 0) {
        req.session.collaborator = user.collaborators[0];
      }
      else {
        return reject(new Error('No organization has already been bound to your account'));
      }
      CollaboratorService.findMy(req).then(function (collaborator) {
        resolve(collaborator);
      }, function (err) {
        reject(err);
      })
    })
  }
};
module.exports = UserService;
