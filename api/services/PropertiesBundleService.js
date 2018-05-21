var PropertiesBundleService = {
  parseReq: function (req) {
    var params = req.params.all();
    var propertiesBundle = {};
    for (var key in params) {
      if (key == 'order') {
        propertiesBundle.order = HandlerService.parseIntegerParams('order', params);
        ;
      }
      else if (key == 'active') propertiesBundle.active = params.active;
      else if (key == 'app') propertiesBundle.app = params.app;
      else if (key == 'displayName') propertiesBundle.displayName = params.displayName;
      else if (key == 'icon') propertiesBundle.icon = params.icon;
      else if (key == 'name') propertiesBundle.name = params.name;
      else if (key == 'tags') propertiesBundle.tags = params.tags;
      else if (key == 'type') propertiesBundle.type = params.type;
    }
    return propertiesBundle;
  },
  beforeAction: function (obj, cb) {
    obj.order = parseInt(obj.order);
    cb();
  },
  destroyPropertyBundleAndProperties: function (arrayOrObjectId) {
    return new Promise(function (resolve, reject) {
      async.waterfall([
        function (next) {
          PropertyBundle.find(arrayOrObjectId)
            .populate('properties')
            .exec(function (err, bundles) {
              if (err) return next(err);
              next(null, bundles);
            })
        },
        function (bundles, next) {
          var concatedPropertiesByFoundBundles = HandlerService.concatChildsArrayByKey(bundles, 'properties');
          Property.destroy(HandlerService.toArrayOfIds(concatedPropertiesByFoundBundles))
            .exec(function (err) {
              if (err) return next(err);
              next(null, bundles);
            })
        },
        function (bundles, next) {
          PropertyBundle.destroy(HandlerService.toArrayOfIds(bundles))
            .exec(function (err) {
              if (err) return next(err);
              next(null, bundles);
            })
        }
      ], function (err) {
        if (err) return reject(err);
        resolve();
      })
    })
  }
}
module.exports = PropertiesBundleService;
