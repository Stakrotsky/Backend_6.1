const express = require('express');
const { addRequest, getRequests } = require('../controllers/request');
const { validateRequestData, validateLoginData } = require('../middleware/validators');
const loginUser = require('../controllers/user');

const requestRouter = express.Router();

requestRouter.post('/', validateRequestData, async (req, res) => {
	try {
		const newRequest = await addRequest({
			name: req.body.name,
			phone: req.body.phone,
			description: req.body.description,
		});

		res.send({ data: newRequest });
	} catch (error) {
		res.status(500).send({ error: 'Ошибка при создании заявки' });
	}
});

requestRouter.get('/requests', async (req, res) => {
	try {
		const {
			page = 1,
			query = '',
			sortField = 'createdAt',
			sortOrder = 'desc',
		} = req.query;
		const data = await getRequests(query, page, 10, sortField, sortOrder);
		res.status(200).send(data);
	} catch (error) {
		res.status(500).send({ error: 'Ошибка получения заявок' });
	}
});

requestRouter.post('/login', validateLoginData, async (req, res) => {
	try {
		const token = await loginUser(req.body.email, req.body.password);
		res.cookie('token', token, { httpOnly: true });
		res.status(200).send({ message: 'Login successful', token });
	} catch (e) {
		res.status(401).send({ error: 'Invalid email or password' });
	}
});

module.exports = requestRouter;
