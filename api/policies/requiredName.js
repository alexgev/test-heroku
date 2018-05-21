module.exports = async function (req, res, proceed) {
	if (req.param('name')) {
		return proceed();
	}
	return res.badRequest("Name is required");

};