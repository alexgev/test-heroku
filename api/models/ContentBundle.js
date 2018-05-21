/**
 * ContentBundle.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http:
 */
module.exports = {
  attributes: {
    active: {
      type: 'boolean'
    },
    name: {
      type: 'string'
    },
    displayName: {
      type: 'string'
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
    app: {
      model: 'app'
    },
    contentUnits: {
      collection: 'contentUnit',
      via: 'contentBundle'
    },
    icon: {
      model: 'dataFile'
    }
  },
  beforeDestroy: function(criteria, cb) {
    ContentBundle.find(criteria.where.id)
      .populate('icon')
      .exec(function(err, contentBundles) {
        if (err) return cb(err);

        FileService.deleteModelWithFilesInBucket(contentBundles).then(
          function() {
            cb();
          },
          function(err) {
            return cb(err);
          }
        )
      })
  },

  toJSON: function () {
    var obj = this.toObject();
    obj.updatedAgo = moment(obj.updatedAt).fromNow();
    obj.createdAgo = moment(obj.createdAt).fromNow();
    return obj
  }
};
