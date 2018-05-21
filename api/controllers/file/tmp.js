module.exports = {


  friendlyName: 'Tmp',


  description: 'Tmp file.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs, exits) {
    var directory = path.join('.', '.tmp');
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
