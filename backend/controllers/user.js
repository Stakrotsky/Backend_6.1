const User = require('../models/User');
const bcrypt = require('bcrypt');
const { generate } = require('../helpers/token');

async function loginUser(email, password) {
	const user = await User.findOne({ email });

	if (!user) {
		throw new Error('Пользователь не найден');
	}

	const isPasswordMatch = await bcrypt.compare(password, user.password);

	if (!isPasswordMatch) {
		throw new Error('Неверный пароль');
	}

	const token = generate({ id: user.id });

	return { token, user };
}

module.exports = loginUser;
