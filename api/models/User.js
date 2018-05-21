/**
 * User.js
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
    email: {
      type: 'string',
      unique: true
    },
    apps: {
      collection: 'app',
      via: 'users',
      dominant: true
    },
    collaborators: {
      collection: 'collaborator',
      via: 'user'
    },
    toJSON: function () {
      var obj = this.toObject();
      obj.updatedAgo = moment(obj.updatedAt).fromNow();
      obj.createdAgo = moment(obj.createdAt).fromNow();
      obj.viewName = obj.name;
      return obj
    }
  }
};
