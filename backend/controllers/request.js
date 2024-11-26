const Request = require('../models/Request');

async function addRequest(request) {
	try {
		const newRequest = await Request.create(request);

		return newRequest;
	} catch (error) {
		throw new Error('Не удалось добавить заявку', error.message);
	}
}

async function getRequests(
	query = '',
	page = 1,
	limit = 10,
	sortField = 'createdAt',
	sortOrder = 'desc',
) {
	try {
		const filter = query ? { name: { $regex: query, $options: 'i' } } : {};

		const sortOptions = { [sortField]: sortOrder === 'asc' ? 1 : -1 };

		const requests = await Request.find(filter)
			.skip((page - 1) * limit)
			.limit(limit)
			.sort(sortOptions);

		const total = await Request.countDocuments(filter);

		return { requests, totalPages: Math.ceil(total / limit) };
	} catch (error) {
		throw new Error('Ошибка получения списка заявок:', error.message);
	}
}

module.exports = { addRequest, getRequests };
