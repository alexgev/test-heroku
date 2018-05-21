/**
 * StatusController
 *
 * @description :: Server-side logic for managing statuses
 * @help        :: See http:
 */
module.exports = {
  index: function (req, res, next) {
    Status.find().exec(function (err, statuses) {
      if (err) return res.serverError(err);
      res.send(statuses);
    });
  },
};
