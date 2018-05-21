var PropertyService = {
  parseReq: function (req) {
    var params = req.params.all();
    var property = {};
    for (var key in params) {
      if (key == 'name') property.name = params.name;
      else if (key == 'active') property.active = params.active;
      else if (key == 'propertyBundle') property.propertyBundle = params.propertyBundle;
      else if (key == 'value') property.value = params.value;
      else if (key == 'valueScript') property.valueScript = params.valueScript;
      else if (key == 'status') property.status = params.status;
    }
    return property;
  }
}
module.exports = PropertyService;
