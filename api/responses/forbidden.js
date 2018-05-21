/**
 * 403 (Forbidden) Handler
 *
 * Usage:
 * return res.forbidden();
 * return res.forbidden(err);
 * return res.forbidden(err, 'some/specific/forbidden/view');
 *
 * e.g.:
 * ```
 * return res.forbidden('Access denied.');
 * ```
 */
module.exports = function forbidden(data, options) {

  var req = this.req;
  var res = this.res;
  var sails = req._sails;

  res.status(200);

  if (data !== undefined) {
    sails.log.verbose('Sending 403 ("Forbidden") response: \n', data);
  }
  else sails.log.verbose('Sending 403 ("Forbidden") response');


  if (sails.config.environment === 'production' && sails.config.keepResponseErrors !== true) {
    data = undefined;
  }


  if (req.wantsJSON || sails.config.hooks.views === false) {
    var myError = {
      error: {
        code: 403,
        description: JSON.stringify(data)
      }
    }
    return res.jsonx(myError);
  }


  options = (typeof options === 'string') ? {view: options} : options || {};

  var viewData = data;
  if (!(viewData instanceof Error) && 'object' == typeof viewData) {
    try {
      viewData = require('util').inspect(data, {depth: null});
    }
    catch (e) {
      viewData = undefined;
    }
  }


  if (options.view) {
    return res.view(options.view, {data: viewData, title: 'Forbidden'});
  }


  else return res.view('403', {data: viewData, title: 'Forbidden'}, function (err, html) {

    if (err) {


      if (err.code === 'E_VIEW_FAILED') {
        sails.log.verbose('res.forbidden() :: Could not locate view for error page (sending JSON instead).  Details: ', err);
      }

      else {
        sails.log.warn('res.forbidden() :: When attempting to render error page view, an error occured (sending JSON instead).  Details: ', err);
      }
      return res.jsonx(data);
    }
    return res.send(html);
  });
};
