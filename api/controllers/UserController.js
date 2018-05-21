/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http:
 */
module.exports = {
  index: function (req, res, next) {
    var params = {};
    var query = User.find(params).sort({'updatedAt': -1});
    var countQuery = User.count(params);
    var dataQuery = HandlerService.setLimit(query, req, 20);
    dataQuery = HandlerService.setSkip(dataQuery, req);
    dataQuery.exec(function (err, users) {
      users = HandlerService.deleteProperty(users, 'encryptedPassword');
      if (err) return res.serverError(err);
      HandlerService.addAgoLabel(users);
      countQuery.exec(function (err, count) {
        res.send({
          collection: users,
          count: count
        });
      })
    });
  },
  get: function (req, res, next) {
    var id = req.param('id');
    User.findOne(id).exec(function foundInfo(err, user) {
      if (err) return res.serverError(err);
      if (!user) return res.notFound('User with id "' + id + '" not found');
      delete user.encryptedPassword;
      res.send(user);
    });
  },
  isauth: function (req, res, next) {
    CollaboratorService.findMy(req)
      .then(function (collaborator) {
        res.send(collaborator);
      }, function (err) {
        res.send(false);
      });
  },
  login: function (req, res, next) {
    if (!req.param('email') || !req.param('password')) return res.send(false);
    User.findOne({
      email: req.param('email')
    }).populate('collaborators').exec(function (err, user) {
      if (err) return res.serverError(err);
      if (!user) return res.notFound('Login and password are wrong');
      if (!user.active) return res.notFound('User with this email "' + req.param('email') + '" was not found');
      require('machinepack-passwords').checkPassword({
        passwordAttempt: req.param('password'),
        encryptedPassword: user.encryptedPassword
      }).exec({
        error: function (err) {
          return res.serverError(err);
        },
        incorrect: function () {
          return res.notFound('Login and password are wrong');
        },
        success: function () {
          UserService.authorized(req, user).then(function (collaborator) {
            setTimeout(function () {
              res.send(collaborator);
            }, 500);
          }, function (err) {
            res.serverError(err);
          });
        }
      });
    });
  },
  create: function (req, res) {


    if (!req.param('password')) return res.badRequest('Password is required');
    var reqModel = UserService.parseReq(req);
    if (!req.param('email')) return res.badRequest('Fill the email field');
    var criteria = {
      email: req.param('email')
    };
    User.findOne(criteria).exec(function (err, user) {
      if (err) return res.serverError(err);

      if (user && user.active) {
        res.status(403);
        return res.send('User "' + req.param('email') + '" has already been registrated');
      }
      async.waterfall([
        function (next) {
          User.findOrCreate({email: req.param('email')}).exec(function (err, user) {
            if (err) return next(err);
            delete user.encryptedPassword;
            user.name = reqModel.name;
            user.email = reqModel.email;
            user.active = reqModel.active;

            user.active = true;
            next(null, user);
          })
        },
        function (user, next) {

          UserService.setPassword(req.param('password'))
            .then(function (result) {
              user.encryptedPassword = result;
              return next(null, user);


            }, function (err) {
              next(err);
            })
        },
        function (user, next) {
          Collaborator.create({
            user: user.id,
            role: req.param('role'),
            organization: req.session.organization
          }).exec(function (err, collaborator) {
            if (err) return next(err);
            next(null, user);
          })
        }
      ], function (err, user) {
        if (err) return res.serverError(err);
        user.save(function (err) {
          if (err) return res.serverError(err);
          delete user.encryptedPassword;
          delete user.hash;
          res.send(user);
        })
      })
    })
  },
  destroy: function (req, res) {
    if (!req.param('id')) return res.badRequest()
    User.findOne(req.param('id')).exec(function (err, user) {
      if (err) return res.serverError(err);
      if (!user) return res.notFound('User with id "' + req.param('id') + '" not found');
      user.deleted = true;
      user.save(function (err) {
        if (err) return res.serverError(err)
        res.send(true)
      })
    });
  },
  update: function (req, res, next) {
    User.findOne(req.param('id')).exec(function (err, user) {
      if (err) return res.serverError(err);
      if (!user) return res.notFound('User with id "' + req.param('id') + '" not found');
      user = UserService.parseReq(req);
      User.update(req.param('id'), user).exec(function (err, updatedUser) {
        if (err) return res.serverError('An error occurred');
        res.send();
      })
    });
  },
  updateMe: function (req, res, next) {
    User.findOne(req.session.me).exec(function (err, user) {
      if (err) return res.serverError(err);
      if (!user) return res.notFound('User with id "' + req.param('id') + '" not found');
      var params = req.params.all();
      if (params.name) user.name = params.name;
      if (params.email) user.email = params.email;
      async.waterfall([
        function (next) {
          if (req.param('password')) {
            UserService.setPassword(req.param('password'))
              .then(function (result) {
                user.encryptedPassword = result;
                next();
              }, function (err) {
                next(err);
              })
          }
          else {
            next();
          }
        },
        function (next) {
          user.save(function (err) {
            if (err) return next(err);
            next();
          })
        }
      ], function (err) {
        if (err) return res.serverError(err);
        res.send();
      })
    });
  },
  logout: function (req, res) {
    User.findOne(req.session.me, function foundUser(err, user) {
      if (err) return res.serverError(err);
      if (!user) return res.send(true);
      req.session.destroy(function (err) {
        if (err) return res.serverError(err);
        setTimeout(function () {
          res.send(true);
        }, 500);
      });
    });
  },


  disable: function (req, res, next) {
    User.findOne(req.param('id')).exec(function (err, user) {
      if (err) return res.serverError(err);
      if (!user) return res.notFound('User with id "' + req.param('id') + '" not found');
      user.active = false;
      user.save(function (err) {
        if (err) return res.serverError(err)
        res.send(true)
      })
    });
  },
  socket: function (req, res, next) {
    res.send({})
  }
};
