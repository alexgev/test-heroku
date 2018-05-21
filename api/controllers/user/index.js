module.exports = {


  friendlyName: 'Index',


  description: 'Index user.',


  inputs: {

  },


  exits: {
    customServerError: {
      responseType: 'serverError'
    },
  },


  fn: async function (inputs, exits) {
    const users = await User.find()
      .intercept((err) => {
        return {customServerError: err}
      })
    return exits.success(users);

  }


};
