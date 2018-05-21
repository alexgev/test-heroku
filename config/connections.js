module.exports.connections = {
  mongodbServer: {
    adapter: 'sails-mongo',
    url: process.env.MONGODB_URI,
    timezone: 'utc'
  },
  myMongodbServer: {
    adapter: 'sails-mongo',
    host: 'localhost',
    port: 27017,
    database: 'prequel'
  },
};
