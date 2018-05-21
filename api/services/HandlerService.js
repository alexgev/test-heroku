var HandlerService = {
  setLimit: function (query, req, defaultLimit) {
    var limit = req.param('limit') || defaultLimit;
    query.limit(limit);
    return query;
  },
  setSkip: function (query, req) {
    var skip = req.param('skip') || 0;
    query.skip(skip);
    return query;
  },
  deleteProperty: function (obj, prop) {
    if (!(typeof (obj) === 'object' && !Array.isArray(obj) && typeof (prop) === 'string')) return obj;
    obj.forEach(function (item) {
      delete item[prop]
    });
    return obj
  },
  addAgoLabel: function (stringOrArray) {
    if (Array.isArray(stringOrArray)) {
      stringOrArray.forEach(function (elem) {
        if (elem.updatedAt) {
          elem.updatedAgo = moment(elem.updatedAt).fromNow();
        }
        if (elem.createdAt) {
          elem.createdAgo = moment(elem.createdAt).fromNow();
        }
      })
    }
  },
  toArrayOfIds: function (array) {
    var arrayOfIds = [];
    array.forEach(function (item) {
      if (item.id) {
        arrayOfIds.push(item.id);
      } else {
        arrayOfIds.push(item);
      }
    })
    return arrayOfIds;
  },
  findByKeyValue: function (array, criteria) {
    var foundIndex = -1;
    array.forEach(function (elem, index) {
      var found = true;
      for (var key in criteria) {
        if (elem.hasOwnProperty(key) && (elem[key] !== criteria[key]))
          found = false;
      }
      if (found) {
        foundIndex = index;
        return index;
      }
    });
    return foundIndex;
  },
  checkPermissions: function (req, statusId) {
    return new Promise(function (resolve, reject) {
      var permissions = {
        administrator: ['dev', 'test', 'release'],
        manager: ['dev', 'test', 'release'],
        developer: ['dev', 'test'],
        contentManager: ['test']
      };
      var access = false;
      Status.findOne(statusId)
        .exec(function (err, status) {
          if (err) return reject(err);
          permissions[req.session.roleName].forEach(function (usersStatus) {
            if (usersStatus === status.name) access = true;
          });
          resolve(access);
        })
    })
  },
  concatChildsArrayByKey: function (array, key) {
    var concatedArray = [];
    array.forEach(function (elem) {
      if (elem[key]) {
        if (Array.isArray(elem[key])) {
          concatedArray = concatedArray.concat(elem[key]);
        } else {
          concatedArray.push(elem[key])
        }
      }
    });
    return concatedArray;
  },


  deepClone: function copy(aObject) {
    var bObject, v, k;
    bObject = Array.isArray(aObject) ? [] : {};
    for (k in aObject) {
      v = aObject[k];
      bObject[k] = (typeof v === "object") ? copy(v) : v;
    }
    return bObject;
  },
  parseIntegerParams: function (field, objectForParse) {

    var result;
    if (objectForParse[field] || objectForParse[field] === '0' || objectForParse[field] === 0) {
      result = parseInt(objectForParse[field])
    } else {
      result = null;
    }
    return result;
  },
  compileScript: function (params, property) {
    return new Promise(function (resolve, reject) {
      if (property.valueScript) {
        try {
          var valueScript = property.valueScript;
          var value = eval(valueScript.toString());
          value = value.toString();
          if (!value && value !== '') {
            return reject('Error! Script "' + property.valueScript + '". Property : id: ' + property.id + ', name: ' + property.name + '. Params: ' + JSON.stringify(params));
          }
          else {
            property.value = value;
          }
        }
        catch (err) {
          return reject(err)
        }
        return resolve(property);
      }
      resolve(property);
    });
  }
};
module.exports = HandlerService;
