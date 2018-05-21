/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */
module.exports.bootstrap = function(cb) {
  moment = require('moment');
  async = require('async');
  numeral = require('numeral');
  Promise = require('bluebird');
  _ = require('underscore')._;
  Passwords = require('machinepack-passwords');
  generatePassword = require('password-generator');
  email = require("emailjs/email");
  fs = require('fs');
  AdmZip = require('adm-zip');
  path = require('path');
  UUID = require('pure-uuid');
  AWS = require('aws-sdk');
  backup = require('mongodb-backup');
  CronJob = require('cron').CronJob;
  archiver = require('archiver');
  // socketIOClient = require('socket.io-client');
  // sailsIOClient = require('sails.io.js');
  // io = sailsIOClient(socketIOClient);
  AWS.config.apiVersions = {
    s3: '2006-03-01'
  };
  AWS.config.update({
    accessKeyId: sails.config.variables.accessKeyId, // process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: sails.config.variables.secretAccessKey //process.env.AWS_SECRET_ACCESS_KEY,
  });
  s3 = new AWS.S3();
  new CronJob('*/1 * * * *', function() {
    FileService.createBackUp().then(function(file){
      console.log(file);
    }, function(err){
      console.log(err);
    })
  }, null, true, 'Europe/Moscow');
  sails.hooks.http.app.disable('etag');
  cb();
};
