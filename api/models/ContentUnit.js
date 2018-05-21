/**
 * ContentUnit.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http:
 */
module.exports = {
  attributes: {
    active: {
      type: 'boolean',
      defaultsTo: false
    },
    name: {
      type: 'string'
    },
    version: {
      type: 'integer'
    },
    apiLevel: {
      type: 'integer'
    },
    type: {
      type: 'string'
    },
    tags: {
      type: 'string'
    },
    order: {
      type: 'integer'
    },
    priceLevel: {
      type: 'integer'
    },
    status: {
      model: 'status'
    },
    contentBundle: {
      model: 'contentBundle'
    },
    icon: {
      model: 'dataFile'
    },
    data: {
      model: 'dataFile'
    },
    cryptedData: {
      model: 'dataFile'
    }
  },

  beforeDestroy: function(criteria, cb) {
    ContentUnit.find(criteria.where.id)
      .populate('icon')
      .populate('cryptedData')
      .populate('data')
      .exec(function(err, contentUnits) {
        if (err) return cb(err);

        FileService.deleteModelWithFilesInBucket(contentUnits).then(
          function() {
            cb();
          },
          function(err) {
            return cb(err);
          }
        )
      })
  }


};
