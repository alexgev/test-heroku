module.exports = async function (req, res, proceed) {
	if (req.param('age')) {
		return proceed();
	}
	return res.badRequest("Age is required");

};