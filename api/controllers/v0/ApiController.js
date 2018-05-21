module.exports = {
  getContentBundles: function (req, res, next) {
    if (!req.param('appId')) return res.badRequest('AppId is required');
    if (!req.param('status')) return res.badRequest('Status is required');
    var appId = req.param('appId');
    var status = req.param('status');
    var deviceId = req.param('deviceId');
    var regionCode = req.param('regionCode');
    var type = req.param('type');
    var tag = req.param('tag');
    var apiLevelFrom = req.param('apiLevelFrom');
    var apiLevelTo = req.param('apiLevelTo');
    var orig = req.param('orig');
    async.waterfall([
      function (next) {
        App.findOne({id: appId, active: true})
          .populate('contentBundles', {active: true})
          .exec(function (err, app) {
            if (err) return next(err);
            if (!app) return next('App with id ' + appId + ' not found');
            next(null, app, HandlerService.toArrayOfIds(app.contentBundles))
          })
      },
      function (app, arrayOfIdsContentBundles, next) {
        AppService.createRequestToDb(req, true)
          .then(function (requestToDb) {
            next(null, app, arrayOfIdsContentBundles, requestToDb);
          }, function (err) {
            next(err);
          })
      },
      function (app, arrayOfIdsContentBundles, requestToDb, next) {
        Object.assign(requestToDb.filterBundle, {id: arrayOfIdsContentBundles});
        ContentBundle.find(requestToDb.filterBundle)
          .populate('contentUnits', requestToDb.filterUnit)
          .populate('icon')
          .exec(function (err, contentBundles) {
            if (err) return next(err);


            next(null, app, contentBundles, requestToDb);
          })
      },
      function (app, contentBundles, requestToDb, next) {
        CounterService.iterateCount(app.id, 'contentBundle', status).then(function () {
          next(null, app, contentBundles);
        }, function (err) {
          next(err);
        });
      },
      function (app, contentBundles, next) {

        var noDuplicateContentBundles = [];
        var noDuplicateContentUnits = [];
        contentBundles.forEach(function (bundle, i) {
          bundle.contentUnits.forEach(function (unit) {
            for (var x = 0; x < noDuplicateContentUnits.length; x++) {
              if (noDuplicateContentUnits[x].name == unit.name) {
                return;
              }
            }
            noDuplicateContentUnits.push(unit);
          });
          noDuplicateContentBundles.push(Object.assign({}, bundle, {contentUnits: noDuplicateContentUnits}));
          noDuplicateContentUnits = [];
        });
        next(null, app, noDuplicateContentBundles);
      },
      function (app, contentBundles, next) {
        var contentUnitsWithIconsAndData = [];
        async.each(contentBundles, function (contentBundle, cb) {
          var requestToDb = Object.assign({}, {
            id: HandlerService.toArrayOfIds(contentBundle.contentUnits),
            sort: {order: 1}
          })
          ContentUnit.find(requestToDb)
            .populate('icon')
            .populate('data')
            .populate('cryptedData')
            .exec(function (err, contentUnits) {
              if (err) return cb(err);
              ContentUnitService.outData(contentUnits, req);
              Object.assign(contentBundle, {contentUnits: contentUnits})
              cb();
            })
        }, function (err) {
          if (err) return next(err);
          next(null, app, contentBundles);
        })
      }
    ], function (err, app, contentBundles) {
      if (err) return res.serverError(err);
      var newObj = Object.assign({}, app);
      newObj.contentBundles = contentBundles;
      delete newObj.users;
      delete newObj.propertyBundles;


      res.send(AppService.rebuildBundlesForSend(newObj.contentBundles, 'contentUnits'));
    })
  },
  getPropertyBundles: function (req, res, next) {
    if (!req.param('appId')) return res.badRequest('AppId is required');
    if (!req.param('status')) return res.badRequest('Status is required');
    var appId = req.param('appId');
    var status = req.param('status');
    var deviceId = req.param('deviceId');
    var regionCode = req.param('regionCode');
    var type = req.param('type');
    var tag = req.param('tag');
    var params = {};
    async.waterfall([
      function (next) {
        params = {
          appId: appId,
          status: status,
          deviceId: deviceId,
          regionCode: regionCode,
          type: type,
          tag: tag
        };
        if (req.param('params') && _.isObject(req.param('params')))
          params = Object.assign(params, req.param('params'));
        Stat.findOrCreate({propertiesReq: true}).exec(function (err, stat) {
          if (!stat.value) stat.value = 1;
          else stat.value++;
          params.inc = stat.value;
          stat.save(function (err) {
            if (err) return next(err);
            next();
          })
        })
      },
      function (next) {
        App.findOne({id: appId, active: true})
          .populate('propertyBundles', {active: true})
          .exec(function (err, app) {
            if (err) return next(err);
            if (!app) return next('App with id ' + appId + ' not found');
            next(null, app, HandlerService.toArrayOfIds(app.propertyBundles))
          })
      },
      function (app, arrayOfIdsPropertyBundles, next) {
        AppService.createRequestToDb(req, true)
          .then(function (requestToDb) {
            next(null, app, arrayOfIdsPropertyBundles, requestToDb);
          }, function (err) {
            next(err);
          })
      },
      function (app, arrayOfIdsPropertyBundles, requestToDb, next) {
        Object.assign(requestToDb.filterBundle, {id: arrayOfIdsPropertyBundles});
        PropertyBundle.find(requestToDb.filterBundle)
          .populate('properties', requestToDb.filterUnit)
          .populate('icon')
          .exec(function (err, propertyBundles) {
            if (err) return next(err);
            next(null, app, propertyBundles, requestToDb);
          })
      },
      function (app, propertyBundles, requestToDb, next) {
        CounterService.iterateCount(app.id, 'propertyBundle', status).then(function () {
          next(null, app, propertyBundles);
        }, function (err) {
          next(err);
        });
      },
    ], function (err, app, propertyBundles) {
      if (err) return res.serverError(err);
      var noDuplicatePropertyBundles = [];
      var noDuplicateProperties = [];
      propertyBundles.forEach(function (bundle, i) {
        bundle.properties.forEach(function (unit) {
          for (var x = 0; x < noDuplicateProperties.length; x++) {
            if (noDuplicateProperties[x].name == unit.name) {
              return;
            }
          }
          noDuplicateProperties.push(unit);
        })
        noDuplicatePropertyBundles.push(Object.assign({}, bundle, {properties: noDuplicateProperties}));
        noDuplicateProperties = [];
      })
      var newObj = Object.assign({}, app);
      newObj.propertyBundles = noDuplicatePropertyBundles;
      delete newObj.users;
      delete newObj.contentBundles;
      async.each(HandlerService.concatChildsArrayByKey(newObj.propertyBundles, 'properties'), function (property, cb) {
        HandlerService.compileScript(params, property).then(function (compiledProperty) {
          delete property.valueScript;
          cb();
        }, function (err) {
          cb(err);
        })
      }, function (err) {
        if (err) return res.serverError(err);
        res.send(AppService.rebuildBundlesForSend(newObj.propertyBundles, 'properties'));
      })
    })
  },
  getContentBundle: function (req, res, next) {
    if (!req.param('appId')) return res.badRequest('AppId is required');
    if (!req.param('status')) return res.badRequest('Status is required');
    if (!req.param('name')) return res.badRequest('Name is required');
    var appId = req.param('appId');
    var status = req.param('status');
    var deviceId = req.param('deviceId');
    var regionCode = req.param('regionCode');
    var name = req.param('name');
    var type = req.param('type');
    var tag = req.param('tag');
    var apiLevelFrom = req.param('apiLevelFrom');
    var apiLevelTo = req.param('apiLevelTo');
    var orig = req.param('orig');
    async.waterfall([
      function (next) {
        App.findOne({id: appId, active: true})
          .populate('contentBundles', {active: true, name: name})
          .exec(function (err, app) {
            if (err) return next(err);
            if (!app) return next('App with id ' + appId + ' not found');
            next(null, app, HandlerService.toArrayOfIds(app.contentBundles))
          })
      },
      function (app, arrayOfIdsContentBundles, next) {
        AppService.createRequestToDb(req)
          .then(function (requestToDb) {
            next(null, app, arrayOfIdsContentBundles, requestToDb);
          }, function (err) {
            next(err);
          })
      },
      function (app, arrayOfIdsContentBundles, requestToDb, next) {
        Object.assign(requestToDb.filterBundle, {id: arrayOfIdsContentBundles});
        ContentBundle.find(requestToDb.filterBundle)
          .populate('contentUnits', requestToDb.filterUnit)
          .populate('icon')
          .exec(function (err, contentBundles) {
            if (err) return next(err);
            next(null, app, contentBundles, requestToDb);
          })
      },
      function (app, contentBundles, requestToDb, next) {
        CounterService.iterateCount(app.id, 'contentBundle', status).then(function () {
          next(null, app, contentBundles);
        }, function (err) {
          next(err);
        });
      },
      function (app, contentBundles, next) {
        var noDuplicateContentBundles = [];
        var noDuplicateContentUnits = [];
        contentBundles.forEach(function (bundle, i) {
          bundle.contentUnits.forEach(function (unit) {
            for (var x = 0; x < noDuplicateContentUnits.length; x++) {
              if (noDuplicateContentUnits[x].name == unit.name) {
                return;
              }
            }
            noDuplicateContentUnits.push(unit);
          });
          noDuplicateContentBundles.push(Object.assign({}, bundle, {contentUnits: noDuplicateContentUnits}));
          noDuplicateContentUnits = [];
        });
        next(null, app, noDuplicateContentBundles)
      },
      function (app, noDuplicateContentBundles, next) {
        var contentUnitsWithIconsAndData = [];
        async.each(noDuplicateContentBundles, function (contentBundle, cb) {
          ContentUnit.find(HandlerService.toArrayOfIds(contentBundle.contentUnits))
            .populate('icon')
            .populate('data')
            .populate('cryptedData')
            .exec(function (err, contentUnits) {
              if (err) return cb(err);
              ContentUnitService.outData(contentUnits, req);
              Object.assign(contentBundle, {contentUnits: contentUnits})
              cb();
            })
        }, function (err) {
          if (err) return next(err);
          next(null, app, noDuplicateContentBundles);
        })
      }
    ], function (err, app, noDuplicateContentBundles) {
      if (err) return res.serverError(err);

      var newObj = Object.assign({}, app);
      newObj.contentBundles = noDuplicateContentBundles;
      delete newObj.users;
      delete newObj.propertyBundles;


      res.send(AppService.rebuildBundlesForSend(newObj.contentBundles, 'contentUnits', true));
    })
  },



  getPropertyBundle: function (req, res, next) {
    if (!req.param('appId')) return res.badRequest('AppId is required');
    if (!req.param('status')) return res.badRequest('Status is required');
    if (!req.param('name')) return res.badRequest('Name is required');
    var appId = req.param('appId');
    var status = req.param('status');
    var name = req.param('name');
    var deviceId = req.param('deviceId');
    var regionCode = req.param('regionCode');
    var type = req.param('type');
    var tag = req.param('tag');
    var params = {};
    async.waterfall([
      function (next) {
        params = {
          appId: appId,
          status: status,
          name: name,
          deviceId: deviceId,
          regionCode: regionCode,
          type: type,
          tag: tag
        };
        if (req.param('params') && _.isObject(req.param('params')))
          params = Object.assign(params, req.param('params'));
        Stat.findOrCreate({propertiesReq: true}).exec(function (err, stat) {
          if (!stat.value) stat.value = 1;
          else stat.value++;
          params.inc = stat.value;
          stat.save(function (err) {
            if (err) return next(err);
            next();
          })
        })
      },
      function (next) {
        App.findOne({id: appId, active: true})
          .populate('propertyBundles', {active: true, name: name})
          .exec(function (err, app) {
            if (err) return next(err);
            if (!app) return next('App with id ' + appId + ' not found');
            next(null, app, HandlerService.toArrayOfIds(app.propertyBundles))
          })
      },
      function (app, arrayOfIdsPropertyBundles, next) {
        AppService.createRequestToDb(req)
          .then(function (requestToDb) {
            next(null, app, arrayOfIdsPropertyBundles, requestToDb);
          }, function (err) {
            next(err);
          })
      },
      function (app, arrayOfIdsPropertyBundles, requestToDb, next) {
        Object.assign(requestToDb.filterBundle, {id: arrayOfIdsPropertyBundles});
        PropertyBundle.find(requestToDb.filterBundle)
          .populate('properties', requestToDb.filterUnit)
          .populate('icon')
          .exec(function (err, propertyBundles) {
            if (err) return next(err);
            next(null, app, propertyBundles);
          })
      },
      function (app, propertyBundles, next) {
        var noDuplicatePropertyBundles = [];
        var noDuplicateProperties = [];
        propertyBundles.forEach(function (bundle, i) {
          bundle.properties.forEach(function (unit) {
            for (var x = 0; x < noDuplicateProperties.length; x++) {
              if (noDuplicateProperties[x].name == unit.name) {
                return;
              }
            }
            noDuplicateProperties.push(unit);
          })
          noDuplicatePropertyBundles.push(Object.assign({}, bundle, {properties: noDuplicateProperties}));
          noDuplicateProperties = [];
        });
        next(null, app, noDuplicatePropertyBundles)
      },
      function (app, noDuplicatePropertyBundles, next) {
        CounterService.iterateCount(app.id, 'propertyBundle', status).then(function () {
          next(null, app, noDuplicatePropertyBundles);
        }, function (err) {
          next(err);
        });
      }
    ], function (err, app, noDuplicatePropertyBundles) {
      if (err) return res.serverError(err);

      var newObj = Object.assign({}, app);
      newObj.propertyBundles = noDuplicatePropertyBundles;
      delete newObj.users;
      delete newObj.contentBundles;
      if (!newObj.propertyBundles[0]) return res.send({data: {}});

      async.each(newObj.propertyBundles[0].properties, function (property, cb) {
        HandlerService.compileScript(params, property).then(function (compiledProperty) {
          delete property.valueScript;
          cb();
        }, function (err) {
          cb(err);
        })
      }, function (err) {
        if (err) return res.serverError(err);
        res.send(AppService.rebuildBundlesForSend(newObj.propertyBundles, 'properties', true));
      })
    })
  }
}
