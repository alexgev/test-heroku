/**
 * CounterController
 *
 * @description :: Server-side logic for managing counters
 * @help        :: See http:
 */
module.exports = {
  index: function (req, res, next) {
    if (!req.param('appId')) return res.badRequest('appId is required');
    var period = {
      start: (req.param('start')) ? moment(req.param('start')) : moment().subtract(30, 'days'),
      end: (req.param('end')) ? moment(req.param('end')) : moment(),
    };
    period.start = moment(period.start);
    period.end = moment(period.end);
    var subQuery = {
      app: req.param('appId'),
      createdAt: {
        $lte: new Date(period.end),
        $gte: new Date(period.start)
      }
    };
    var resData = {
      content: [],
      property: []
    }
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
        subQuery.type = "contentBundle";
        async.eachSeries(statuses, function (status, cb) {
          subQuery.status = status.id;
          Counter.count(subQuery).exec(function (err, count) {
            if (err) return next(err);
            resData.content.push({
              name: status.name,
              count: count
            });
            cb();
          })
        }, function (err) {
          if (err) return next(err);
          next(null, statuses);
        });
      },
      function (statuses, next) {
        subQuery.type = "propertyBundle";
        async.eachSeries(statuses, function (status, cb) {
          subQuery.status = status.id;
          Counter.count(subQuery).exec(function (err, count) {
            if (err) return next(err);
            resData.property.push({
              name: status.name,
              count: count
            });
            cb();
          })
        }, function (err) {
          if (err) return next(err);
          next();
        });
      }
    ], function (err) {
      if (err) return res.serverError(err);
      res.send(resData);
    })
  }
};
