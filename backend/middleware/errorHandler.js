const handleError = (err, req, res, next) => {
	console.error(err);
	res.status(500).send({ error: 'Внутренняя ошибка сервера' });
};

module.exports = { handleError };
