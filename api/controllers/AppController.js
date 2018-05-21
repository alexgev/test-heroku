/**
 * AppController
 *
 * @description :: Server-side logic for managing apps
 * @help        :: See http:
 */
module.exports = {
  index: function (req, res, next) {
    var params = {}
    var query = App.find(params).sort({'createdAt': -1});
    var countQuery = App.count(params);


    query.exec(function (err, apps) {
      if (err) return res.serverError(err);
      HandlerService.addAgoLabel(apps);
      countQuery.exec(function (err, count) {
        res.send({
          collection: apps,
          count: count
        });
      })
    });
  },
  get: function (req, res, next) {
    var id = req.param('id');
    App.findOne(id).exec(function foundInfo(err, app) {
      if (err) return res.serverError(err);
      if (!app) return res.notFound('App with id "' + id + '" not found');
      res.send(app);
    });
  },
  update: function (req, res, next) {
    var reqModel = AppService.parseReq(req);
    var id = req.param('id');
    App.findOne(id).exec(function (err, app) {
      if (err) return res.serverError(err);
      if (!app) return res.notFound('App with id "' + id + '" not found');
      App.update(id, reqModel).exec(function (err, app) {
        if (err) return res.serverError('An error occurred');
        res.send();
      });
    })
  },
  create: function (req, res, next) {
    var reqModel = AppService.parseReq(req);
    App.create(reqModel).exec(function (err, app) {
      if (err) return res.serverError(err);
      res.send();
    })
  },
  destroy: function (req, res, next) {
    var id = req.param('id');


    async.waterfall([
      function (next) {
        App.findOne(id)
          .populate('contentBundles')
          .populate('propertyBundles')
          .exec(function (err, app) {
            if (err) return next(err);
            if (!app) return next('App with id "' + id + '" not found');
            next(null, app);
          })
      },
      function (app, next) {
        ContentBundleService.destroyContentBundleAndContentUnits(HandlerService.toArrayOfIds(app.contentBundles))
          .then(function () {
            next(null, app);
          }, function (err) {
            next(err)
          })
      },
      function (app, next) {
        PropertiesBundleService.destroyPropertyBundleAndProperties(HandlerService.toArrayOfIds(app.propertyBundles))
          .then(function () {
            next(null, app);
          }, function (err) {
            next(err)
          })
      },
      function (app, next) {
        App.destroy(app.id)
          .exec(function (err) {
            if (err) return next(err);
            next()
          })
      }
    ], function (err) {
      if (err) return res.serverError(err);
      res.send();
    })
  },
  disable: function (req, res, next) {
    var id = req.param('id');
    App.findOne(id).exec(function (err, app) {
      if (err) return res.serverError(err);
      if (!app) return res.notFound('App with id "' + id + '" not found');
      App.update(id, {active: false}).exec(function (err) {
        if (err) return res.serverError(err);
        res.send();
      })
    })
  },
  getContentBundles: function (req, res, next) {
    var id = req.param('id');
    async.waterfall([
      function (next) {
        App.findOne(id)
          .populate('contentBundles', {sort: {'createdAt': -1}})
          .exec(function (err, app) {
            if (err) return next(err);
            if (!app) return next('App with id "' + id + '" not found');
            HandlerService.addAgoLabel(app.contentBundles);
            next(null, app, HandlerService.toArrayOfIds(app.contentBundles));
          })
      },
      function (app, arrayOfContentBundlesIds, next) {
        ContentBundle.find(arrayOfContentBundlesIds)
          .populate('icon')
          .exec(function (err, contentBundles) {
            if (err) return next(err);
            next(null, app, contentBundles);
          })
      }
    ], function (err, app, contentBundles) {
      if (err) return res.serverError(err);
      app.contentBundles = contentBundles;
      res.send(app);
    })
  },
  getPropertyBundles: function (req, res, next) {
    var id = req.param('id');
    async.waterfall([
      function (next) {
        App.findOne(id)
          .populate('propertyBundles', {sort: {'createdAt': -1}})
          .exec(function (err, app) {
            if (err) return next(err);
            if (!app) return next('App with id "' + id + '" not found');
            HandlerService.addAgoLabel(app.propertyBundles);
            next(null, app, HandlerService.toArrayOfIds(app.propertyBundles));
          })
      },
      function (app, arrayOfPropertyBundlesIds, next) {
        PropertyBundle.find(arrayOfPropertyBundlesIds)
          .populate('icon')
          .exec(function (err, propertyBundles) {
            if (err) return next(err);
            next(null, app, propertyBundles);
          })
      }
    ], function (err, app, propertyBundles) {
      if (err) return res.serverError(err);
      app.propertyBundles = propertyBundles;
      res.send(app);
    })


  },
  activeCount: function (req, res, next) {
    if (!req.param('appId')) return res.badRequest('appId is required');
    var subQuery = {
      active: true
    };
    var resData = {
      content: [],
      property: []
    };
    async.waterfall([
      function (next) {
        StatusService.getSortStatuses().then(function (statuses) {
            next(null, statuses);
          },
          function (err) {
            next(err);
          })
      },
      function (statuses, next) {
        async.eachSeries(statuses, function (status, cb) {
          subQuery.status = status.id;
          ContentBundle.find({app: req.param('appId')})
            .populate('contentUnits', subQuery)
            .exec(function (err, contentBundles) {
              if (err) return next(err);
              resData.content.push({
                name: status.name,
                count: HandlerService.concatChildsArrayByKey(contentBundles, 'contentUnits').length
              });
              cb();
            })
        }, function (err) {
          if (err) return next(err);
          next(null, statuses);
        });
      },
      function (statuses, next) {
        async.each(statuses, function (status, cb) {
          subQuery.status = status.id;
          PropertyBundle.find({app: req.param('appId')})
            .populate('properties', subQuery)
            .exec(function (err, propertyBundles) {
              if (err) return next(err);
              resData.property.push({
                name: status.name,
                count: HandlerService.concatChildsArrayByKey(propertyBundles, 'properties').length
              });
              cb();
            })
        }, function (err) {
          if (err) return next(err);
          next(null);
        });
      }
    ], function (err) {
      if (err) return res.serverError(err);
      res.send(resData);
    })
  }
};
