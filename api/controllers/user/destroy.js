module.exports = {


  friendlyName: 'Destroy',


  description: 'Destroy user.',


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
    const user = await User.destroy(userId)
      .fetch()
      .intercept((err) => {
        return {customServerError: err.raw}
      })
    if (!user) throw {notFound: "Пользователь с id " + userId + " не найден"};
    return exits.success(user);

  }


};
