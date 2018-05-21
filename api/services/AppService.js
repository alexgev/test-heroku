var AppService = {
  parseReq: function (req) {
    var application = {};
    var params = req.params.all();
    for (var key in params) {
      if (key == 'active') application.active = params.active;
      else if (key == 'name') application.name = params.name;
    }
    return application;
  },
  createRequestToDb: function (req, someBundles) {
    var params = req.params.all();
    var filterBundle = {active: true};
    var filterUnit = {
      active: true,
      sort: {createdAt: -1}
    }
    return new Promise(function (resolve, reject) {
      if (params.status) {
        Status.findOne({name: params.status})
          .exec(function (err, status) {
            if (err) return reject(err);
            if (!status) return reject('Status with name ' + params.status + ' not found');
            createRequest(req, status.id);
          })
      } else {
        createRequest(req);
      }

      function createRequest(req, status) {
        if (status) filterUnit.status = status;
        if (someBundles) {
          if (params.type || params.type === '') filterBundle.type = params.type;
          if (params.tag) filterBundle.tags = {contains: params.tag};
        } else {
          if (params.type || params.type === '') filterUnit.type = params.type;
          if (params.tag) filterUnit.tags = {contains: params.tag};
        }
        if (params.apiLevelTo && params.apiLevelFrom) {
          filterUnit.apiLevel = {$gte: params.apiLevelFrom, $lte: params.apiLevelTo}
        } else if (params.apiLevelFrom) {
          filterUnit.apiLevel = {$gte: params.apiLevelFrom}
        } else if (params.apiLevelTo) {
          filterUnit.apiLevel = {$lte: params.apiLevelTo}
        }
        filterUnit.sort = {
          createdAt: -1,
          version: -1,
          id: -1
        };
        resolve({filterBundle: filterBundle, filterUnit: filterUnit});
      }
    })
  },
  rebuildBundlesForSend: function (bundles, field, ifOneItem) {
    bundles.forEach(function (bundle) {
      bundle.content = [];
      delete bundle.active;
      bundle[field].forEach(function (content) {
        delete content.active;
        bundle.content.push(content);
      })
      delete bundle[field];
    })
    var sendingObj = {
      data: {}
    };
    if (ifOneItem) {
      sendingObj.data = bundles[0] || {};
    } else {
      sendingObj.data.bundles = bundles;
    }
    return sendingObj;
  }
}
module.exports = AppService;
