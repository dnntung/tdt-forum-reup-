const {check} = require('express-validator')
const {ytVidId} = require('../utils')

exports.createPost = () => [
	check('content')
		.exists().withMessage('Vui lòng nhập nội dung bài viết!')
		.notEmpty().withMessage('Nội dung bài viết không được để trống!'),
	check('videoURL')
		.if(check('videoURL').exists())
		.custom((value) => ytVidId(value) != false)
		.withMessage('Đường dẫn youtube không hợp lệ!')
]