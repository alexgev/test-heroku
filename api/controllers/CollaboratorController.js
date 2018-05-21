/**
 * CollaboratorController
 *
 * @description :: Server-side logic for managing collaborators
 * @help        :: See http:
 */
module.exports = {
  index: function (req, res, next) {
    Collaborator.find({organization: req.session.organization}).sort({'createdAt': -1})
      .populate('role')
      .populate('organization')
      .populate('user')
      .exec(function foundInfo(err, collaborators) {
        if (err) return res.serverError(err);

        res.send(collaborators);
      });
  },
  me: function (req, res, next) {
    Collaborator.find({user: req.session.me}).sort({'createdAt': -1})
      .populate('role')
      .populate('organization')
      .populate('user')
      .exec(function foundInfo(err, collaborators) {
        if (err) return res.serverError(err);
        res.send(collaborators);
      });
  },
  set: function (req, res, next) {
    async.waterfall([
      function (next) {
        Collaborator.find({user: req.session.me})
          .populate('organization')
          .populate('role')
          .exec(function (err, collaborators) {
            if (err) return next(err);
            var idx = HandlerService.findByKeyValue(collaborators, {id: req.param('id')});
            if (idx === -1) return next('You are trying to choose an invalid position');
            next();
          });
      },
      function (next) {
        req.session.collaborator = req.param('id');
        CollaboratorService.findMy(req).then(
          function (collaborator) {
            User.update(req.session.me, {currentCollaborator: collaborator.id}).exec(function (err, user) {
              if (err) next(err);
              next(null, collaborator);
            });
          },
          function (err) {
            return next(err);
          }
        )
      }
    ], function (err, collaborator) {
      if (err) return res.serverError(err);
      res.send(collaborator);
    });
  },
  get: function (req, res, next) {
    var id = req.param('id') || req.session.collaborator;
    Collaborator.findOne(id)
      .populate('role')
      .populate('organization')
      .populate('user')
      .exec(function foundInfo(err, collaborator) {
        if (err) return res.serverError(err);
        if (!collaborator) return res.serverError('Collaborator with id "' + id + '" not found');
        res.send(collaborator);
      });
  },
  update: function (req, res, next) {
    var id = req.param('id');
    async.waterfall([
      function (next) {
        Collaborator.findOne(id)
          .populate('user')
          .exec(function (err, collaborator) {
            if (err) return next(err);
            if (!collaborator || !collaborator.user) return next('Collaborator with id "' + id + '" not found');
            next(null, collaborator);
          })
      }, function (collaborator, next) {
        var updatedUser = UserService.parseReq(req);
        User.update(collaborator.user.id, updatedUser).exec(function (err, user) {
          if (err) return next(err);
          next(null, collaborator);
        })
      }, function (collaborator, next) {
        collaborator.role = req.param('role');
        collaborator.save(function (err) {
          if (err) return next(err);
          next(null, collaborator);
        })
      }
    ], function (err, collaborator) {
      if (err) return res.serverError(err);
      res.send(collaborator);
    })
  },
  disable: function (req, res, next) {
    var id = req.param('id');
    Collaborator.findOne(id)
      .populate('user')
      .exec(function (err, collaborator) {
        if (err) return res.serverError(err);
        if (!collaborator) return res.notFound('Collaborator with id "' + id + '" not found');
        collaborator.user.active = false;
        collaborator.user.save(function (err) {
          if (err) return res.serverError(err)
          res.send(true)
        })
      });
  },
  destroy: function (req, res, next) {
    var id = req.param('id');


    async.waterfall([
      function (next) {
        Collaborator.findOne(id)
          .populate('user')
          .exec(function (err, collaborator) {
            if (err) return next(err);
            if (!collaborator) return next('Collaborator with id "' + id + '" not found');
            next(null, collaborator.user.id);
          })
      },
      function (userId, next) {
        Collaborator.destroy(id)
          .exec(function (err) {
            if (err) return next(err);
            next(null, userId)
          })
      },
      function (userId, next) {
        User.destroy(userId)
          .exec(function (err) {
            if (err) return next(err);
            next()
          })
      }
    ], function (err) {
      if (err) return res.serverError(err);
      res.send();
    })
  }
};
