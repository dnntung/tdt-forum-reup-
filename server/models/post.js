const mongoose = require('mongoose')

module.exports = mongoose.model('Post', new mongoose.Schema({
	posterId: String,
	content: String,
	upvote: {
		type: Number, 
		default: 0
	},
	videoURL: String
}, {timestamps: true}))