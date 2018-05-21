/**
 * 404 (Not Found) Handler
 *
 * Usage:
 * return res.notFound();
 * return res.notFound(err);
 * return res.notFound(err, 'some/specific/notfound/view');
 *
 * e.g.:
 * ```
 * return res.notFound();
 * ```
 *
 * NOTE:
 * If a request doesn't match any explicit routes (i.e. `config/routes.js`)
 * or route blueprints (i.e. "shadow routes", Sails will call `res.notFound()`
 * automatically.
 */
module.exports = function notFound(data, options) {

  var req = this.req;
  var res = this.res;
  var sails = req._sails;

  res.status(200);

  if (data !== undefined) {
    sails.log.verbose('Sending 404 ("Not Found") response: \n', data);
  }
  else sails.log.verbose('Sending 404 ("Not Found") response');


  if (sails.config.environment === 'production' && sails.config.keepResponseErrors !== true) {
    data = undefined;
  }


  if (req.wantsJSON || sails.config.hooks.views === false) {
    var myError = {
      error: {
        code: 404,
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
    return res.view(options.view, {data: viewData, title: 'Not Found'});
  }


  else return res.view('404', {data: viewData, title: 'Not Found'}, function (err, html) {

    if (err) {


      if (err.code === 'E_VIEW_FAILED') {
        sails.log.verbose('res.notFound() :: Could not locate view for error page (sending JSON instead).  Details: ', err);
      }

      else {
        sails.log.warn('res.notFound() :: When attempting to render error page view, an error occured (sending JSON instead).  Details: ', err);
      }
      return res.jsonx(data);
    }
    return res.send(html);
  });
};
