const Router = require('express').Router()
const checkToken = require('../middlewares/check-token')
const Post = require('../models/post')
const {validationResult} = require('express-validator')

// Validators
const postValidator = require('../validators/post')

Router.use(checkToken)

// GET /post
// Xem danh sách bài viết
Router.get('/', (req,res) => {
	const getPosts = async () => { 
		return await Post.find({})
	}
	
	getPosts()
		.then((posts) => res.json({
			ok: true, 
			data: {posts}
		}))
		.catch((err) => res.json({
			ok: false, 
			msg: 'Đã có lỗi xảy ra!'
		}))
})

// POST /post
// Tạo bài viết mới
Router.post('/', postValidator.createPost(), (req,res) => {
	const errors = validationResult(req);

    if (!errors.isEmpty()) {
		return res.status(400).json({
			ok: false,
			msg: errors.array()[0].msg
		})
    }

	const {content, videoURL, user} = req.body
	const createPost = async () => {
		const post = new Post({
				posterId: user._id,
				content,
				videoURL
			})

		return await post.save()
	}

	createPost()
		.then((post) => res.json({
			ok: true, 
			msg: 'Đăng bài viết thành công!',
			data: {post}
		}))
		.catch((err) => {
			console.log(err)
			return res.json({
				ok: false, 
				msg: 'Đã có lỗi xảy ra!'
			})
		})
})


// PUT /post/:postId
// Chỉnh sửa bài viết
// 	Router.put('/:postId', (req,res) => {
// 	const {postId} = req.params
// 	const updatePost = async () => {}
// 
// 	updatePost()
// 		.then(() => res.json({
// 			ok: true, 
// 			msg: 'Chỉnh sửa bài viết thành công!'
// 		}))
// 		.catch((err) => res.json({
// 			ok: false, 
// 			msg: 'Đã có lỗi xảy ra!'
// 		}))
// })
// 

// DELETE /post/:postId
// Xóa bài viết
// Router.delete('/:postId', (req,res) => {
// 	const {postId} = req.params
// 	const deletePost = async () => {}
// 
// 	deletePost()
// 		.then(() => res.json({
// 			ok: true, 
// 			msg: 'Xóa bài viết thành công!'
// 		}))
// 		.catch((err) => res.json({
// 			ok: false, 
// 			msg: 'Đã có lỗi xảy ra!'
// 		}))
// })

module.exports = Router