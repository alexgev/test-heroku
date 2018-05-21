module.exports = {


  friendlyName: 'Create.',


  description: 'Create user.',


  inputs: {
    
  },


  exits: {
    customServerError: {
      responseType: 'serverError'
    }
  },


  fn: async function (inputs, exits) {
    const newUser = sails.helpers.user.parseReq(this.req)
    const createdUser = await User.create(newUser).fetch()
      .intercept((err) => {
        return {customServerError: err};
      })
    return exits.success(createdUser);

  }


};