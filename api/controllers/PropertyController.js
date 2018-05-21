/**
 * PropertyController
 *
 * @description :: Server-side logic for managing properties
 * @help        :: See http:
 */
/**
 * PropertyController
 *
 * @description :: Server-side logic for managing propertys
 * @help        :: See http:
 */
module.exports = {
  index: function (req, res, next) {
    var params = {};
    var query = Property.find(params).sort({'createdAt': -1});
    var countQuery = Property.count(params);
    var dataQuery = HandlerService.setLimit(query, req, 20);
    dataQuery = HandlerService.setSkip(dataQuery, req);
    dataQuery.exec(function (err, properties) {
      if (err) return res.serverError(err);
      countQuery.exec(function (err, count) {
        res.send({
          collection: properties,
          count: count
        });
      })
    });
  },
  get: function (req, res, next) {
    var id = req.param('id');
    Property.findOne(id).exec(function foundInfo(err, property) {
      if (err) return res.serverError(err);
      if (!property) return res.notFound('Property with id "' + id + '" not found');
      res.send(property);
    });
  },
  update: function (req, res, next) {
    var reqModel = PropertyService.parseReq(req);
    var id = req.param('id');
    Property.findOne(id)
      .exec(function (err, property) {
        if (err) return res.serverError(err);
        if (!property) return res.notFound('Property with id "' + id + '" not found');
        HandlerService.checkPermissions(req, property.status)
          .then(function (access) {
            if (access === true) {
              Property.update(id, reqModel).exec(function (err, property) {
                if (err) return res.serverError(err);
                res.send();
              });
            } else {
              res.forbidden('You don`t have permission');
            }
          }, function (err) {
            res.serverError(err);
          })
      })
  },
  create: function (req, res, next) {

    var reqModel = PropertyService.parseReq(req);
    HandlerService.checkPermissions(req, reqModel.status)
      .then(function (access) {
        if (access === true) {
          Property.create(reqModel).exec(function (err, property) {
            if (err) return res.serverError(err);
            res.send();
          })
        } else {
          res.forbidden('You don`t have permission');
        }
      }, function (err) {
        res.serverError(err);
      })
  },
  destroy: function (req, res, next) {
    var id = req.param('id');
    Property.findOne(id)
      .exec(function (err, property) {
        if (err) return res.serverError(err);
        if (!property) return res.notFound('Property with id "' + id + '" not found');
        HandlerService.checkPermissions(req, property.status)
          .then(function (access) {
            if (access === true) {
              Property.destroy(id).exec(function (err) {
                if (err) return res.serverError(err);
                res.send();
              })
            } else {
              res.forbidden('You don`t have permission');
            }
          }, function (err) {
            res.serverError(err);
          })
      })
  },
  disable: function (req, res, next) {
    var id = req.param('id');
    Property.findOne(id)
      .exec(function (err, property) {
        if (err) return res.serverError(err);
        if (!property) return res.notFound('Property with id "' + id + '" not found');
        HandlerService.checkPermissions(req, property.status)
          .then(function (access) {
            if (access === true) {
              Property.update(id, {active: false}).exec(function (err) {
                if (err) return res.serverError(err);
                res.send();
              })
            } else {
              res.forbidden('You don`t have permission');
            }
          }, function (err) {
            res.serverError(err);
          })
      })
  },
  testScript(req, res, next) {
    Property.findOne('5ad7b041b26c820d11dd1abd')
      .exec(function (err, property) {
        if (err) return res.serverError(err);
        var params = {
          value: 1,
          appId: "43546",
          inc: 3
        };
        HandlerService.compileScript(params, property).then(function (result) {
          res.send(property);
        }, function (err) {
          res.serverError(err);
        })
      })
  }
};
