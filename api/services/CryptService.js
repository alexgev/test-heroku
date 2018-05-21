const assert = require('assert');
const debug = require('debug')('crypt');
const fs = require('fs');
const path = require('path');
const KEY_SHIFT = 3;
const deleteFolderRecursive = (path) => {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach((file) => {
      const curPath = path + "/" + file;
      if (fs.lstatSync(curPath).isDirectory()) {
        deleteFolderRecursive(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};
const prepareOutputFolder = (outputFolder) => {
  if (fs.existsSync(outputFolder)) {
    debug("output folder exists (will be deleted)");
    try {
      deleteFolderRecursive(outputFolder);
    } catch (e) {
      sails.sentry.captureError(e);
    }
  }
  if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder);
  }
};
const encodeFilename = (filename, fullKey) => {
  if (isProtectedFile(filename)) {
    return filename;
  }
  const Iconv = require('iconv').Iconv;
  const ic8859 = new Iconv('UTF-8', 'ISO-8859-1');
  var bytes = ic8859.convert(new Buffer(filename));
  for (var i = 0; i < bytes.length; i++) {
    const key = fullKey & 0xFF;
    bytes[i] = (bytes[i] ^ key) & 0xFF;
    fullKey = rightCircShift(fullKey, KEY_SHIFT);
  }
  return bytes.toString('hex').toUpperCase();
};
const processFloder = (inputFolder, outputFolder) => {
  fs.readdirSync(inputFolder).forEach((file) => {
    const curPath = path.resolve(inputFolder, file);
    if (fs.lstatSync(curPath).isDirectory()) {
      const outputSubFolder = path.resolve(outputFolder, file);
      fs.mkdirSync(outputSubFolder);
      processFloder(curPath, outputSubFolder);
    } else if (!isIgnoredFile(curPath)) {
      const fullKey = getKey(file);
      const outputFile = path.resolve(outputFolder, encodeFilename(file, fullKey));
      processFile(curPath, outputFile, fullKey);
    } else {
      console.log("    ignore file: " + curPath);
    }
  });
};
const processFile = (inputFile, outputFile, fullKey) => {
  const passthrough = isProtectedFile(inputFile);
  var outputStream = fs.createWriteStream(outputFile);
  fs.createReadStream(inputFile)
    .on('data', (buff) => {
      for (var i = 0; i < buff.length; i++) {
        key = fullKey & 0xFF;
        if (!passthrough) {
          buff[i] = (buff[i] ^ key) & 0xFF;
        }
        fullKey = rightCircShift(fullKey, KEY_SHIFT);
      }
      outputStream.write(buff);
    })
    .on('close', () => {
      outputStream.end();
    });
};
const isProtectedFile = (filename) => {
  return (filename != null && filename.endsWith(".mp4") || filename.endsWith(".mov"));
};
const isIgnoredFile = (filename) => {
  return (filename != null && filename === ".DS_Store");
};
const rightCircShift = (bits, shift) => {
  return (bits >>> shift) | (bits << (32 - shift));
};
const getKey = (str) => {
  var ret_val = 0;
  const Iconv = require('iconv').Iconv;
  const ic8859 = new Iconv('UTF-8', 'ISO-8859-1');
  const data = ic8859.convert(new Buffer(str));
  const size = data.length;
  for (var i = 0; i < size; i++) {
    for (var j = 0; j < 4; j++) {
      ret_val ^= ((data[i] * (i + j + 1)) << j * 8);
    }
  }
  return ret_val;
};
module.exports = {
  encrypt(inputFolder, outputFolder) {
    prepareOutputFolder(outputFolder);
    processFloder(inputFolder, outputFolder);
  }
};
