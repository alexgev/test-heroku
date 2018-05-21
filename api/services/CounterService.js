var CounterService = {
  iterateCount: function (app, type, status) {
    return new Promise(function (resolve, reject) {
      async.waterfall([
        function (next) {
          Status.findOne({name: status}).exec(function (err, status) {
            if (err) return next(err);
            if (!status) return res.notFound('Status with name "' + status + '" no found');
            next(null, status)
          })
        },
        function (status, next) {
          Counter.create({
            status: status.id,
            app: app,
            type: type
          }).exec(function (err, counter) {
            if (err) return next(err)
            next();
          })
        }
      ], function (err) {
        if (err) return reject(err);
        resolve();
      })
    });
  }
};
module.exports = CounterService;
