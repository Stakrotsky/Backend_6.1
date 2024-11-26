const mongoose = require('mongoose');

const RequestSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		phone: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: false,
		},
	},
	{ timestamps: true },
);

const Request = mongoose.model('Request', RequestSchema);

module.exports = Request;
