module.exports = {


  friendlyName: 'Update',


  description: 'Update user.',


  inputs: {

  },


  exits: {
    notFound: {
      responseType: 'notFound'
    },
    customServerError: {
      responseType: 'serverError'
    }
  },


  fn: async function (inputs, exits) {
    const userId = this.req.param('id');
    const newUser = sails.helpers.user.parseReq(this.req);
    const user = await User.findOne(userId)
      .intercept((err) => {
        return {customServerError: err}
      })
    if (!user) throw {notFound: "Пользователь с id " + userId + " не найден"};
    const updatedUser = await User.update(userId, newUser)
      .fetch()
      .intercept((err) => {
        return {customServerError: err}
      })
    return exits.success(updatedUser);

  }


};
