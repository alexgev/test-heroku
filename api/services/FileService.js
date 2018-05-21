var configFileName = "scene.f2f";
var FileService = {
  unzip: function (filePath, filename) {
    const id = new UUID(4).format();
    const directory = path.join('.', '.tmp', 'uploads', id);
    var outPath = directory + '/';
    fs.mkdirSync(outPath);

    return new Promise(function (resolve, reject) {
      var zip = new AdmZip(filePath);
      var zipEntries = zip.getEntries();

      var haveConfigFile = false;
      zipEntries.forEach(function (zipEntry) {

        if (zipEntry.name === configFileName) {
          haveConfigFile = true;
        }
      });

      zip.extractAllTo(outPath, true);
      var resObject = {
        version: -1
      };
      var options = {
        name: filename
      };
      FileService.uploadFromPath(filePath, options).then(function (data) {
        resObject.data = data;

        if (!haveConfigFile) {

          //TODO refact copy
          const newId = new UUID(4).format();
          const newDirectory = path.join('.', '.tmp', 'uploads', newId);
          CryptService.encrypt(directory, newDirectory);
          FileService.pathToZip(newDirectory).then(function (zipName) {
            const newOutPath = newDirectory + '/';
            const zipPath = path.join('.', '.tmp', 'uploads') + '/' + zipName;
            var options = {
              name: zipName
            };
            FileService.uploadFromPath(zipPath, options).then(function (cryptedData) {
              // fs.unlinkSync(zipPath);
              FileService.deleteFolderRecursive(newDirectory);
              resObject.cryptedData = cryptedData;
              return resolve(resObject);
            }, function (err) {
              fs.unlinkSync(zipPath);
              FileService.deleteFolderRecursive(newDirectory);
              fs.unlinkSync(filePath);
              FileService.deleteFolderRecursive(directory);
              return reject(err);
            });
          }, function (err) {
            return reject(err)
          });
        }
        else {
          fs.readFile(outPath + configFileName, 'utf8', function (err, data) {
            if (err) return reject(err);
            var config;
            try {
              config = JSON.parse(data)
            }
            catch (err) {
              return reject(err);
            }
            async.waterfall([
              function (next) {
                if (config.name) resObject.name = config.name;
                if (config.version) {
                  resObject.version = config.version;
                  resObject.apiLevelDisabled = true;
                }
                next();
              },
              function (next) {
                if (config.icon) {
                  var options = {
                    name: config.icon
                  }
                  FileService.uploadFromPath(outPath + config.icon, options).then(function (icon) {
                    resObject.icon = icon;
                    next();
                  }, function (err) {
                    next(err);
                  });
                }
                else {
                  next();
                }
              },
              function (next) {
                if (config.f2fxor === false) {
                  next();
                }
                else {
                  const newId = new UUID(4).format();
                  const newDirectory = path.join('.', '.tmp', 'uploads', newId);
                  CryptService.encrypt(directory, newDirectory);
                  FileService.pathToZip(newDirectory).then(function (zipName) {
                    const newOutPath = newDirectory + '/';
                    const zipPath = path.join('.', '.tmp', 'uploads') + '/' + zipName;
                    var options = {
                      name: zipName
                    };
                    FileService.uploadFromPath(zipPath, options).then(function (cryptedData) {
                      // fs.unlinkSync(zipPath);
                      FileService.deleteFolderRecursive(newDirectory);
                      resObject.cryptedData = cryptedData;
                      next();
                    }, function (err) {
                      fs.unlinkSync(zipPath);
                      FileService.deleteFolderRecursive(newDirectory);
                      next(err);
                    });
                  }, function (err) {
                    FileService.deleteFolderRecursive(newDirectory);
                    next(err)
                  });
                }
              }
            ], function (err) {
              fs.unlinkSync(filePath);
              FileService.deleteFolderRecursive(directory);
              if (err) return reject(err);
              resolve(resObject);
            });
          });
        }
      }, function (err) {
        fs.unlinkSync(filePath);
        FileService.deleteFolderRecursive(directory);
        reject(err);
      });
    })
  },
  pathToZip: function (directory) {
    return new Promise(function (resolve, reject) {
      var zip = archiver('zip');
      const zipName = new UUID(4).format() + '.zip';
      const output = fs.createWriteStream(path.join('.', '.tmp', 'uploads', zipName));

      zip.on('error', function (err) {
        reject(err);
      });
      zip.on('finish', function () {
        resolve(zipName);
      });

      zip.directory(directory + '/', false);
      zip.pipe(output);
      zip.finalize();
    })
  },
  uploadFile: function (file) {
    return new Promise(function (resolve, reject) {
      var filename = Math.floor(new Date() / 1000) + '_' + file._files[0].stream.filename;
      file.upload({
          adapter: require('skipper-s3'),
          key: sails.config.variables.accessKeyId,
          secret: sails.config.variables.secretAccessKey,
          bucket: sails.config.variables.s3BucketName,
          saveAs: filename
        },
        function (err, uploadedFiles) {
          if (err) {
            return reject(err);
          }
          if (uploadedFiles) {
            var arrayFiles = [];
            uploadedFiles.forEach(function (file) {
              if (file.extra) file.extra.viewName = file.extra.key || file.extra.Key || 'unnamed'
              arrayFiles.push(file.extra);
            });
            DataFile.create(arrayFiles).exec(function (err, files) {
              if (err) return reject(err);
              resolve({
                message: files.length + ' item(s) loaded',
                uploadedFile: files
              });
            });
          }
          else {
            return reject({'message': 'File is not loaded. Please, try again'});
          }
        });
    });
  },
  uploadFromPath: function (filePath, options) {
    return new Promise(function (resolve, reject) {
      const newId = new UUID(4).format();
      fs.readFile(filePath, function (err, data) {
        if (err) return reject(err);
        var base64data = new Buffer(data, 'binary');
        s3.upload({
          Bucket: sails.config.variables.s3BucketName,
          Key: newId + options.name,
          ACL: 'public-read',
          Body: base64data,
          ContentType: options.type
        }, function (err, res) {
          if (err) return reject(err);
          if (options.backup) res.backup = options.backup;
          res.viewName = options.name;
          DataFile.create(res).exec(function (err, file) {
            if (err) return reject(err);
            resolve(file);
          });
        })
      })
    })
  },
  deleteFolderRecursive: function (path) {
    if (fs.existsSync(path)) {
      fs.readdirSync(path).forEach(function (file, index) {
        var curPath = path + "/" + file;
        if (fs.lstatSync(curPath).isDirectory()) {
          FileService.deleteFolderRecursive(curPath);
        } else {
          fs.unlinkSync(curPath);
        }
      });
      fs.rmdirSync(path);
    }
  },
  createBackUp: function () {
    return new Promise(function (resolve, reject) {
      const id = new UUID(4).format();
      const directory = path.join('.', '.tmp', 'uploads', id);
      const uploadDirectory = path.join('.', '.tmp', 'uploads');
      var outPath = directory + '/';
      if (!fs.existsSync(uploadDirectory)) {
        fs.mkdirSync(uploadDirectory);
      }
      fs.mkdirSync(outPath);
      backup({

        uri: sails.config.variables.mongodb,
        root: outPath,
        callback: function () {

          FileService.pathToZip(directory).then(function (zipName) {
            const zipPath = path.join('.', '.tmp', 'uploads') + '/' + zipName;
            var options = {
              name: zipName
            };
            FileService.uploadFromPath(zipPath, options)
              .then(function (file) {
                fs.unlinkSync(zipPath);
                FileService.deleteFolderRecursive(directory)
                resolve(file);
              }, function (err) {
                fs.unlinkSync(zipPath);
                FileService.deleteFolderRecursive(directory)
                reject(err);
              })
          }, function (err) {
            reject(err);
          })
        }
      })
    })
  },
  testCreateFolder: function() {
    var directory = path.join('.', '.tmp', 'uploads', new UUID(4).format());
    fs.mkdirSync(directory);
    return directory;
  },
  deleteModelWithFilesInBucket: function(items) {
    return new Promise(function(resolve, reject) {
        var keys = ['data', 'cryptedData', 'icon'];
        async.each(items, function(item, cb) {

          async.each(keys, function(key, callback) {
            if (!item[key]) return callback();
            params = {
              Bucket: item[key].Bucket,
              Key: item[key].Key
            }
            s3.deleteObject(params, function(err, data) {
              item[key].deleted = true;
              item[key].save(function(err) {
                callback();
              });
            })
          }, function(err) {
            cb(err);
          })
        }, function(err) {
          if (err) return reject(err);
          resolve();
        })
      }
    )
  }
};
module.exports = FileService;
