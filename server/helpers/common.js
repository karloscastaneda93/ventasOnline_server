module.exports = {
	cookieExtractor: function (req) {
		const { name } = this;
		let token = null;
		if (req && req.cookies) {
			token = req.cookies[name];
		}
		return token;
	},
	generateRandomId: function (s) {
		const prefix = "PREFIX_";
		for (var i = 0, h = 0xdeadbeef; i < s.length; i++)
			h = Math.imul(h ^ s.charCodeAt(i), 2654435761);
		return prefix + ((h ^ h >>> 16) >>> 0);
	}
}