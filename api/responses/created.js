/**
 * 201 (CREATED) Response
 *
 * Usage:
 * return res.created();
 * return res.created(data);
 * return res.created(data, 'auth/login');
 *
 * @param  {Object} data
 * @param  {String|Object} options
 *          - pass string to render specified view
 */
module.exports = function created(data, options) {

  var req = this.req;
  var res = this.res;
  var sails = req._sails;
  sails.log.silly('res.created() :: Sending 201 ("CREATED") response');

  res.status(201);


  if (req.wantsJSON || sails.config.hooks.views === false) {
    return res.jsonx(data);
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
    return res.view(options.view, {data: viewData, title: 'Created'});
  }


  else return res.guessView({data: viewData, title: 'Created'}, function couldNotGuessView() {
    return res.jsonx(data);
  });
};
