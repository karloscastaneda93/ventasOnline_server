module.exports = {
	cookieExtractor: function (req) {
		const { name } = this;
		let token = null;
		if (req && req.cookies) {
			token = req.cookies[name];
		}
		return token;
	}
}