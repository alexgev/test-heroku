/**
 * FileController
 *
 * @description :: Server-side logic for managing files
 * @help        :: See http:
 */
module.exports = {
  uploadIcon: function (req, res, next) {
    var file = req.file('image');
    if (!file) {
      //TODO clearTimeout
      return res.badRequest();
    }
    file.upload(
      {
        maxBytes: 1024 * 1024 * 32
      },
      function (err, uploadedFiles) {
        if (err) {
          return res.serverError(err);
        }
        if (uploadedFiles && uploadedFiles[0]) {
          uploadedFile = uploadedFiles[0];

          FileService.uploadFromPath(uploadedFile.fd, {name: uploadedFile.filename})
            .then(function (file) {
              fs.unlinkSync(uploadedFile.fd);
              res.send(file);
            }, function (err) {
              fs.unlinkSync(uploadedFile.fd);
              res.serverError(err);
            });
        }
        else {
          res.serverError();
        }
      }
    )
  },


  test: function (req, res, next) {
    DataFile.find().exec(function (err, files) {
      async.each(files, function (file, cb) {
        if (file.extra) {
          for (var key in file.extra) {
            file[key] = file.extra[key];
          }
          file.save(function (err) {
            cb();
          })
        }
        else {
          cb();
        }
      }, function (err) {
        res.ok();
      })
    })
  },
  uploadArchive: function (req, res, next) {
    var file = req.file('archive');
    if (!file) {
      clearTimeout(file.timeouts.untilMaxBufferTimer);
      clearTimeout(file.timeouts.untilFirstFileTimer);
      return res.badRequest();
    }
    file.upload(
      {
        maxBytes: 1024 * 1024 * 32
      },
      function (err, uploadedFiles) {
        if (err) {
          return res.serverError(err);
        }
        if (uploadedFiles && uploadedFiles[0]) {
          uploadedFile = uploadedFiles[0];
          FileService.unzip(uploadedFile.fd, uploadedFile.filename).then(function (result) {
            res.send(result)
          }, function (err) {
            res.serverError(err);
          })
        }
        else {
          res.serverError();
        }
      }
    )
  },
  test: function(req, res, next) {
    var directory = FileService.testCreateFolder();
    res.send(directory);
  },
  readdir: function(req, res, next) {
    var directory = fs.readdirSync(req.param('dir'));
    res.send(directory);
  }

};
