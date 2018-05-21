/**
 * PropertyBundle.js
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
    properties: {
      collection: 'property',
      via: 'propertyBundle'
    },
    icon: {
      model: 'dataFile'
    }
  },

  beforeDestroy: function(criteria, cb) {
    PropertyBundle.find(criteria.where.id)
      .populate('icon')
      .exec(function(err, propertyBundles) {
        if (err) return cb(err);

        FileService.deleteModelWithFilesInBucket(propertyBundles).then(
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
