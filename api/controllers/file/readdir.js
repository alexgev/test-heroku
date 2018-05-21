module.exports = {


  friendlyName: 'Readdir',


  description: 'Readdir file.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs, exits) {
    var directory = path.join('.', '.tmp', 'uploads');
    var dir = this.req.param('dir');
    var directory;
    try {
      directory = fs.readdirSync(dir);

    } catch(e) {
      if (e) return exits.success({error: e, directory: dir});
    }
    return exits.success(directory);

  }


};
