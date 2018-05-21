/**
 * Property.js
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
    value: {
      type: 'string'
    },
    valueScript: {
      type: 'string'
    },
    status: {
      model: 'status'
    },
    propertyBundle: {
      model: 'propertyBundle'
    }
  }
};
