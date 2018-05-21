/**
 * 400 (Bad Request) Handler
 *
 * Usage:
 * return res.badRequest();
 * return res.badRequest(data);
 * return res.badRequest(data, 'some/specific/badRequest/view');
 *
 * e.g.:
 * ```
 * return res.badRequest(
 *   'Please choose a valid `password` (6-12 characters)',
 *   'trial/signup'
 * );
 * ```
 */
module.exports = function badRequest(data, options) {

  var req = this.req;
  var res = this.res;
  var sails = req._sails;

  res.status(200);

  if (data !== undefined) {
    sails.log.verbose('Sending 400 ("Bad Request") response: \n', data);
  }
  else sails.log.verbose('Sending 400 ("Bad Request") response');


  if (sails.config.environment === 'production' && sails.config.keepResponseErrors !== true) {
    data = undefined;
  }


  if (req.wantsJSON || sails.config.hooks.views === false) {
    var myError = {
      error: {
        code: 400,
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
    return res.view(options.view, {data: viewData, title: 'Bad Request'});
  }


  else return res.guessView({data: viewData, title: 'Bad Request'}, function couldNotGuessView() {
    return res.jsonx(data);
  });
};
