/**
 * Counter.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http:
 */
module.exports = {
  attributes: {
    status: {
      model: 'status'
    },
    app: {
      model: 'app'
    },
  },
  beforeCreate: function (values, cb) {
    Counter.count().exec(function (err, count) {
      if (err) cb(err);
      values.index = count;
      cb();
    })
  }
};
