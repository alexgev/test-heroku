/**
 * PropertyBundleController
 *
 * @description :: Server-side logic for managing propertiesbundles
 * @help        :: See http:
 */
module.exports = {
  index: function (req, res, next) {
    var params = {}
    var query = PropertyBundle.find(params).sort({'createdAt': -1});
    var countQuery = PropertyBundle.count(params);
    var dataQuery = HandlerService.setLimit(query, req, 20);
    dataQuery = HandlerService.setSkip(dataQuery, req);
    dataQuery.exec(function (err, propertyBundles) {
      if (err) return res.serverError(err);
      HandlerService.addAgoLabel(propertyBundles);
      countQuery.exec(function (err, count) {
        res.send({
          collection: propertyBundles,
          count: count
        });
      })
    });
  },
  get: function (req, res, next) {
    var id = req.param('id');
    PropertyBundle.findOne(id).populate('icon').exec(function foundInfo(err, propertyBundle) {
      if (err) return res.serverError(err);
      if (!propertyBundle) return res.notFound('Properties bundle with id "' + id + '" not found');
      res.send(propertyBundle);
    });
  },
  update: function (req, res, next) {
    var reqModel = PropertiesBundleService.parseReq(req);
    var id = req.param('id');
    PropertyBundle.findOne(id).exec(function (err, propertyBundle) {
      if (err) return res.serverError(err);
      if (!propertyBundle) return res.notFound('Properties bundle with id "' + id + '" not found');
      PropertyBundle.update(id, reqModel).exec(function (err, propertyBundle) {
        if (err) return res.serverError(err);
        res.send();
      });
    })
  },
  create: function (req, res, next) {
    var reqModel = PropertiesBundleService.parseReq(req);
    async.waterfall([
      function (next) {
        App.findOne(reqModel.app)
          .populate('propertyBundles')
          .exec(function (err, app) {
            if (err) return next(err);
            if (!app) return next('App with id "' + id + '" not found');
            next(null, app);
          })
      },
      function (app, next) {
        var repetition = 0;
        app.propertyBundles.forEach(function (item) {
          if (item.name == reqModel.name) ++repetition;
        })
        if (repetition > 0) return next('This name already exists');
        next();
      },
      function (next) {
        PropertyBundle.create(reqModel).exec(function (err, bundle) {
          if (err) return next(err);
          next();
        })
      }
    ], function (err) {
      if (err) return res.serverError(err);
      res.send();
    })
  },
  destroy: function (req, res, next) {
    var id = req.param('id');
    PropertiesBundleService.destroyPropertyBundleAndProperties(id)
      .then(function () {
        res.send()
      })
      .catch(function (err) {
        res.serverError(err)
      })
  },
  disable: function (req, res, next) {
    var id = req.param('id');
    PropertyBundle.findOne(id).exec(function (err, propertyBundle) {
      if (err) return res.serverError(err);
      if (!propertyBundle) return res.notFound('Property bundle with id "' + id + '" not found');
      PropertyBundle.update(id, {active: false}).exec(function (err) {
        if (err) return res.serverError(err);
        res.send();
      })
    })
  },
  getProperties: function (req, res, next) {
    var id = req.param('id');
    PropertyBundle.findOne(id)
      .populate('properties', {sort: {createdAt: -1}})
      .exec(function (err, propertyBundle) {
        if (err) return res.serverError(err);
        if (!propertyBundle) return res.notFound('Property bundle with id "' + id + '" not found');
        var propertiesIds = HandlerService.toArrayOfIds(propertyBundle.properties);
        Property.find(propertiesIds)
          .populate('status')
          .exec(function (err, propertiesWithStatus) {
            if (err) return res.serverError(err);
            propertyBundle.properties = propertiesWithStatus;
            HandlerService.addAgoLabel(propertyBundle.properties);
            res.send(propertyBundle);
          })
      })
  },
};
