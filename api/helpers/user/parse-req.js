module.exports = {
  sync: true,
  
  friendlyName: 'Parse req',


  description: '',


  inputs: {
    req: {
      type: 'ref'
    }
  },


  exits: {

  },


  fn: function (inputs, exits) {         
    const params = inputs.req.allParams(); 
    let user = {}
    for (let key in params) {
      if (key == 'name') user.name = params.name;
      else if (key == 'age') user.age = params.age;
    }
    // All done.
    return exits.success(user);

  }


};

