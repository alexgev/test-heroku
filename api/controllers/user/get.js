module.exports = {


  friendlyName: 'Get',


  description: 'Get user.',


  inputs: {

  },


  exits: {
    customServerError: {
      responseType: 'serverError'
    },
    notFound: {
      responseType: 'notFound'
    }
  },


  fn: async function (inputs, exits) {
    const userId = this.req.param('id');
    const user = await User.findOne(userId)
      .intercept((err) => {
        return {customServerError: err}
      })
    if (!user) throw {notFound: "Пользователь с id " + userId + " не найден"};
    return exits.success(user);

  }


};
