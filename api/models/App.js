/**
 * App.js
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
    users: {
      collection: 'user',
      via: 'apps'
    },
    contentBundles: {
      collection: 'contentBundle',
      via: 'app'
    },
    propertyBundles: {
      collection: 'propertyBundle',
      via: 'app'
    },
    counts: {
      collection: 'counter',
      via: 'status'
    }
  }
};
