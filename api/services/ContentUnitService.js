var ContentUnitService = {
  parseReq: function (req) {
    var params = req.params.all();
    var contentUnit = {};
    for (var key in params) {
      if (key == 'name') contentUnit.name = params.name;
      else if (key == 'icon') contentUnit.icon = params.icon;
      else if (key == 'type') contentUnit.type = params.type;
      else if (key == 'tags') contentUnit.tags = params.tags;
      else if (key == 'data') contentUnit.data = params.data;
      else if (key == 'cryptedData') contentUnit.cryptedData = params.cryptedData;
      else if (key == 'status') contentUnit.status = params.status;
      else if (key == 'contentBundle') contentUnit.contentBundle = params.contentBundle;
      else if (key == 'active') contentUnit.active = params.active;
      else if (key == 'apiLevelDisabled') contentUnit.apiLevelDisabled = true;
      else if (key == 'order') {
        contentUnit.order = HandlerService.parseIntegerParams('order', params);
      }
      else if (key == 'version') {
        contentUnit.version = HandlerService.parseIntegerParams('version', params);
      }
      else if (key == 'apiLevel') {
        contentUnit.apiLevel = HandlerService.parseIntegerParams('apiLevel', params);
      }
      else if (key == 'priceLevel') {
        contentUnit.priceLevel = HandlerService.parseIntegerParams('priceLevel', params);
      }
    }
    return contentUnit;
  },
  outData: function (contentUnits, req) {
    var original = req.param('orig') && (req.param('status') !== 'release');
    contentUnits.forEach(function (unit) {
      if (!unit.cryptedData) return;

      if (!original) {
        delete unit.data;
        unit.data = unit.cryptedData;
        delete unit.cryptedData;
      }
      else {
        delete unit.cryptedData;
      }
    })
  }
};
module.exports = ContentUnitService;
