const mongoose = require('mongoose')





/**
 * Model: POST
 * 
 * userId: id thằng đăng bài
 * content: nội dung bài viết
 * videoUrl: đường dẫn tới youtube video đính kèm
 * imageUrl: đường dẫn hình ảnh đính kèm (chỉ cho phép user upload 1 ảnh duy nhất?)
 * 
 * upvote, downvote: lượt tương tác bài viết của các user khác
 */
module.exports = mongoose.model('Post', new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	content: String,
	upvote: {
		type: Number, 
		default: 0
	},
	downvote: {
		type: Number, 
		default: 0
	},
	videoUrl: String,
	imageUrl: String
}, {timestamps: true}))