var StatusService = {
  getSortStatuses: function () {
    return new Promise(function (resolve, reject) {
      Status.find().sort({name: -1}).exec(function (err, statuses) {
        if (err) return reject(err);
        resolve(statuses);
      })
    })
  }
}
module.exports = StatusService;
