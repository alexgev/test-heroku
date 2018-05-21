/**
 * ContentBundleController
 *
 * @description :: Server-side logic for managing contentbundles
 * @help        :: See http:
 */
module.exports = {
  index: function (req, res, next) {
    var params = {}
    var query = ContentBundle.find(params).sort({'createdAt': -1});
    var countQuery = ContentBundle.count(params);


    query.exec(function (err, contentBundles) {
      if (err) return res.serverError(err);
      countQuery.exec(function (err, count) {
        res.send({
          collection: contentBundles,
          count: count
        });
      })
    });
  },
  get: function (req, res, next) {
    var id = req.param('id');
    ContentBundle.findOne(id).populate('icon').exec(function foundInfo(err, bundle) {
      if (err) return res.serverError(err);
      if (!bundle) return res.notFound('Content bundle with id "' + id + '" not found');
      res.send(bundle);
    });
  },
  update: function (req, res, next) {
    var reqModel = ContentBundleService.parseReq(req);
    var id = req.param('id');
    ContentBundle.findOne(id).exec(function (err, bundle) {
      if (err) return res.serverError(err);
      if (!bundle) return res.notFound('Content bundle with id "' + id + '" not found');
      ContentBundle.update(id, reqModel).exec(function (err, bundle) {
        if (err) return res.serverError(err);
        res.send();
      });
    })
  },
  create: function (req, res, next) {
    var reqModel = ContentBundleService.parseReq(req);
    async.waterfall([
      function (next) {
        App.findOne(reqModel.app)
          .populate('contentBundles')
          .exec(function (err, app) {
            if (err) return next(err);
            if (!app) return next('App with id "' + id + '" not found');
            next(null, app);
          })
      },
      function (app, next) {
        var repetition = 0;
        app.contentBundles.forEach(function (item) {
          if (item.name == reqModel.name) ++repetition;
        })
        if (repetition > 0) return next('This name already exists');
        next();
      },
      function (next) {
        ContentBundle.create(reqModel).exec(function (err, bundle) {
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
    ContentBundleService.destroyContentBundleAndContentUnits(id)
      .then(function () {
        res.send()
      })
      .catch(function (err) {
        res.serverError(err)
      })
  },
  disable: function (req, res, next) {
    var id = req.param('id');
    ContentBundle.findOne(id).exec(function (err, bundle) {
      if (err) return res.serverError(err);
      if (!bundle) return res.notFound('Content bundle with id "' + id + '" not found');
      ContentBundle.update(id, {active: false}).exec(function (err) {
        if (err) return res.serverError(err);
        res.send();
      })
    })
  },
  getContentUnits: function (req, res, next) {
    var id = req.param('id');
    async.waterfall([
      function (next) {
        ContentBundle.findOne(id)
          .populate('contentUnits', {sort: {version: -1}})
          .exec(function (err, contentBundle) {
            if (err) return next(err);
            if (!contentBundle) return next('Content bundle with id "' + id + '" not found');
            var contentUnitsIds = HandlerService.toArrayOfIds(contentBundle.contentUnits);
            next(null, contentBundle, contentUnitsIds);
          })
      },
      function (contentBundle, contentUnitsIds, next) {
        ContentUnit.find(contentUnitsIds)
          .populate('status')
          .populate('icon')
          .populate('data')
          .populate('cryptedData')
          .exec(function (err, contentUnitWithStatus) {
            if (err) return next(err);
            contentBundle.contentUnits = contentUnitWithStatus;
            HandlerService.addAgoLabel(contentBundle.contentUnits);
            next(null, contentBundle);
          })
      }
    ], function (err, contentBundle) {
      if (err) return res.serverError(err);
      res.send(contentBundle);
    })
  },
};
