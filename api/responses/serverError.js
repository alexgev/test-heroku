/**
 * 500 (Server Error) Response
 *
 * Usage:
 * return res.serverError();
 * return res.serverError(err);
 * return res.serverError(err, 'some/specific/error/view');
 *
 * NOTE:
 * If something throws in a policy or controller, or an internal
 * error is encountered, Sails will call `res.serverError()`
 * automatically.
 */
module.exports = function serverError(data, options) {

  var req = this.req;
  var res = this.res;
  var sails = req._sails;

  res.status(200);

  if (data !== undefined) {
    sails.log.error('Sending 500 ("Server Error") response: \n', data);
  }
  else sails.log.error('Sending empty 500 ("Server Error") response');


  if (sails.config.environment === 'production' && sails.config.keepResponseErrors !== true) {
    data = undefined;
  }


  if (req.wantsJSON || sails.config.hooks.views === false) {
    var myError = {
      error: {
        code: 500,
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
    return res.view(options.view, {data: viewData, title: 'Server Error'});
  }


  else return res.view('500', {data: viewData, title: 'Server Error'}, function (err, html) {

    if (err) {


      if (err.code === 'E_VIEW_FAILED') {
        sails.log.verbose('res.serverError() :: Could not locate view for error page (sending JSON instead).  Details: ', err);
      }

      else {
        sails.log.warn('res.serverError() :: When attempting to render error page view, an error occured (sending JSON instead).  Details: ', err);
      }
      return res.jsonx(data);
    }
    return res.send(html);
  });
};
