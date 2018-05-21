/**
 * Collaborator.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http:
 */
module.exports = {
  attributes: {
    user: {
      model: 'user'
    },
    organization: {
      model: 'organization'
    },
    role: {
      model: 'role'
    }
  }
};
