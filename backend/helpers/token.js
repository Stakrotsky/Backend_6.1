const jwt = require('jsonwebtoken');

const sign = 'test';

module.exports = {
	generate(data) {
		return jwt.sign(data, sign, { expiresIn: '30d' });
	},
	verify(token) {
		if (!token) {
			throw new Error('Неверный токен');
		}
		return jwt.verify(token, sign);
	},
};
