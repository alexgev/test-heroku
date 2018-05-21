var ContentBundleService = {
  parseReq: function (req) {
    var params = req.params.all();
    var contentBundle = {};
    for (var key in params) {
      if (key == 'order') {
        contentBundle.order = HandlerService.parseIntegerParams('order', params);
      }
      else if (key == 'active') contentBundle.active = params.active;
      else if (key == 'app') contentBundle.app = params.app;
      else if (key == 'displayName') contentBundle.displayName = params.displayName;
      else if (key == 'icon') contentBundle.icon = params.icon;
      else if (key == 'name') contentBundle.name = params.name;
      else if (key == 'tags') contentBundle.tags = params.tags;
      else if (key == 'type') contentBundle.type = params.type;
    }
    return contentBundle;
  },
  destroyContentBundleAndContentUnits: function (arrayOrObjectId) {
    return new Promise(function (resolve, reject) {
      async.waterfall([
        function (next) {
          ContentBundle.find(arrayOrObjectId)
            .populate('contentUnits')
            .exec(function (err, bundles) {
              if (err) return next(err);
              next(null, bundles);
            })
        },
        function (bundles, next) {
          var concatedContentUnitsByFoundBundles = HandlerService.concatChildsArrayByKey(bundles, 'contentUnits');
          ContentUnit.destroy(HandlerService.toArrayOfIds(concatedContentUnitsByFoundBundles))
            .exec(function (err) {
              if (err) return next(err);
              next(null, bundles);
            })
        },
        function (bundles, next) {
          ContentBundle.destroy(HandlerService.toArrayOfIds(bundles))
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
module.exports = ContentBundleService;
