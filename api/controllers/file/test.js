module.exports = {


  friendlyName: 'Test',


  description: 'Test file.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs, exits) {
    var directory = path.join('.', '.tmp', 'uploads', Date.now() + '');
    console.log('toSave', directory);
    console.log('dirname', __dirname);
    try {
      fs.mkdirSync(directory);

    } catch(e) {
      if (e) return exits.success({error: e, directory: directory});
    }
    return exits.success(directory);

  }


};
