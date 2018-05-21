/**
 * Role.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http:
 */
module.exports = {
  attributes: {
    collaborators: {
      collection: 'collaborator',
      via: 'role'
    },
    permissions: {
      collection: 'permission',
      via: 'roles',
      dominant: true
    },
    statuses: {
      collection: 'status',
      via: 'roles',
      dominant: true
    }
  }
};
