/**
 * Status.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http:
 */
module.exports = {
  attributes: {
    properties: {
      collection: 'property',
      via: 'status'
    },
    contentUnits: {
      collection: 'contentUnit',
      via: 'status'
    },
    roles: {
      collection: 'role',
      via: 'statuses'
    },
    counts: {
      collection: 'counter',
      via: 'status'
    }
  }
};
