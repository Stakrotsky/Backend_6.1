const validateRequestData = (req, res, next) => {
	const { name, phone, description } = req.body;
	if (!name || !phone || !description) {
		return res.status(400).send({ error: 'Missing required fields' });
	}
	next();
};

const validateLoginData = (req, res, next) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return res.status(400).send({ error: 'Email and password are required' });
	}
	next();
};

module.exports = { validateRequestData, validateLoginData };
