const mongoose = require('mongoose');

const Link = new mongoose.Schema({
	id: String,
	url: String,
	current: Number,
	max: Number
});

mongoose.connect('mongodb://localhost/nonce', {
	useNewUrlParser: true
});

module.exports = mongoose.model('Link', Link);