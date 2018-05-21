/**
 * ContentUnitController
 *
 * @description :: Server-side logic for managing contentunits
 * @help        :: See http:
 */
/**
 * ContentUnitController
 *
 * @description :: Server-side logic for managing contentUnits
 * @help        :: See http:
 */
module.exports = {
  index: function (req, res, next) {
    var params = {}
    var query = ContentUnit.find(params).sort({'createdAt': -1});
    var countQuery = ContentUnit.count(params);
    var dataQuery = HandlerService.setLimit(query, req, 20);
    dataQuery = HandlerService.setSkip(dataQuery, req);
    dataQuery.exec(function (err, contentUnits) {
      if (err) return res.serverError(err);
      HandlerService.addAgoLabel(contentUnits);
      countQuery.exec(function (err, count) {
        res.send({
          collection: contentUnits,
          count: count
        });
      })
    });
  },
  get: function (req, res, next) {
    var id = req.param('id');
    ContentUnit.findOne(id)
      .populate('data')
      .populate('cryptedData')
      .populate('icon').exec(function foundInfo(err, contentUnit) {
      if (err) return res.serverError(err);
      if (!contentUnit) return res.notFound('Content unit with id "' + id + '" not found');
      res.send(contentUnit);
    });
  },
  update: function (req, res, next) {

    var reqModel = ContentUnitService.parseReq(req);
    var id = req.param('id');
    ContentUnit.findOne(id)
      .exec(function (err, contentUnit) {
        if (err) return res.serverError(err);
        if (!contentUnit) return res.notFound('Content unit with id "' + id + '" not found');
        HandlerService.checkPermissions(req, contentUnit.status)
          .then(function (access) {
            if (access === true) {
              ContentUnit.update(id, reqModel).exec(function (err, contentUnit) {
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

    var reqModel = ContentUnitService.parseReq(req);
    HandlerService.checkPermissions(req, reqModel.status)
      .then(function (access) {
        if (access === true) {
          ContentUnit.create(reqModel).exec(function (err, contentUnit) {
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
    ContentUnit.findOne(id)
      .exec(function (err, contentUnit) {
        if (err) return res.serverError(err);
        if (!contentUnit) return res.notFound('Content unit with id "' + id + '" not found');
        HandlerService.checkPermissions(req, contentUnit.status)
          .then(function (access) {
            if (access === true) {
              ContentUnit.destroy(id).exec(function (err) {
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
    ContentUnit.findOne(id)
      .exec(function (err, contentUnit) {
        if (err) return res.serverError(err);
        if (!contentUnit) return res.notFound('Content unit with id "' + id + '" not found');
        HandlerService.checkPermissions(req, contentUnit.status)
          .then(function (access) {
            if (access === true) {
              ContentUnit.update(id, {active: false}).exec(function (err) {
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
};
