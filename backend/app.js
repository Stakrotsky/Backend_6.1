const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { handleError } = require('./middleware/errorHandler');
const requestRouter = require('./routes/requestRouter');

const port = 3001;
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(handleError);

app.use('/', requestRouter);

mongoose
	.connect(
		'mongodb+srv://stakrotsky:RsWAqS5ueibdLrKa@cluster0.7tzap.mongodb.net/clinic',
	)
	.then(() => {
		app.listen(port, () => {
			console.log(`Server started on port ${port}`);
		});
	});
