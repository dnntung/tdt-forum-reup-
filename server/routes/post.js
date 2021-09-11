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
		.catch((err) => {
			console.log(err)

			return res.json({
				ok: false, 
				msg: 'Đã có lỗi xảy ra!'
			})
		})
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
Router.put('/:postId', postValidator.updatePost(), (req,res) => {
	const errors = validationResult(req);

    if (!errors.isEmpty()) {
		return res.status(400).json({
			ok: false,
			msg: errors.array()[0].msg
		})
    }

	const {postId} = req.params
	const {user, content, videoURL} = req.body
	const updatePost = async () => {
		// Người dùng chỉ có thể chỉnh sửa bài viết của chính họ
		const post = await Post.findOne({
			_id: postId,
			posterId: user._id
		})

		if (post) {
			post.content = content
			post.videoURL = videoURL ? videoURL : post.videoURL

			return await post.save()
		}

		return null
	}

	updatePost()
		.then((post) => {
			if (!post) {
				return res.status(404).json({
					ok: false, 
					msg: 'Không tìm thấy bài viết!'
				})
			}

			return res.json({
				ok: true, 
				msg: 'Chỉnh sửa bài viết thành công!',
				data: {post}
			})
		})
		.catch((err) => res.json({
			ok: false, 
			msg: 'Đã có lỗi xảy ra!'
		}))
})


// DELETE /post/:postId
// Xóa bài viết
Router.delete('/:postId', (req,res) => {
	const {postId} = req.params
	const {user} = req.body
	const deletePost = async () => {
		// Người dùng chỉ có thể xóa bài viết của chính họ
		return await Post.deleteOne({
			_id: postId,
			posterId: user._id
		}) 
	}

	deletePost()
		.then(({deletedCount}) => {
			// Nếu bài viết xóa thành công -> deletedCount = 1
			if (deletedCount != 1) {
				return res.status(404).json({
					ok: false, 
					msg: 'Không tìm thấy bài viết!'
				})
			}

			return res.json({
					ok: false, 
					msg: 'Xóa bài viết thành công!'
				})
		})
		.catch((err) => {
			console.log(err)
			return res.json({
				ok: false, 
				msg: 'Đã có lỗi xảy ra!'
			})
		})
})

module.exports = Router