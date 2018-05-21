module.exports = async function (req, res, proceed) {
	if (req.param('id')) {
		return proceed();
	}
	return res.badRequest("Id is required");

};