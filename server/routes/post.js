const Router = require('express').Router()
const checkToken = require('../middlewares/check-token')
const Post = require('../models/post')
const {validationResult} = require('express-validator')

// Validators
const postValidator = require('../validators/post')

Router.use(checkToken)

/**
 * GET /post - All posts 
 * 
 * @query userId - lấy tất cả post được đăng bởi user có id này
 */
Router.get('/', (req,res) => {
	const {userId} = req.query
	const getPosts = async () => { 
		return userId ? await Post.find({userId}) : await Post.find({})
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

/**
 * POST /post - Create a post
 * 
 * @body userId - id của user đăng post
 * @body content - nội dung post
 * @body videoUrl (optional) - đường dẫn youtube video
 * @file image - ảnh đính kèm
 */
Router.post('/', postValidator.createPost(), (req,res) => {
	const errors = validationResult(req);

    if (!errors.isEmpty()) {
		return res.status(400).json({
			ok: false,
			msg: errors.array()[0].msg
		})
    }

	const {content, videoURL, userId} = req.body
	const createPost = async () => {
		const post = new Post({
				userId,
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

/**
 * PUT /post/:postId - Update a post
 * Người dùng chỉ có thể chỉnh sửa post của họ
 * 
 * @param postId - id post cần chỉnh sửa
 * @body content - nội dung post
 */
Router.put('/:postId', postValidator.updatePost(), (req,res) => {
	const errors = validationResult(req);

    if (!errors.isEmpty()) {
		return res.status(400).json({
			ok: false,
			msg: errors.array()[0].msg
		})
    }

	const {postId} = req.params
	const {userId, content, videoURL} = req.body
	const updatePost = async () => {
		const post = await Post.findOne({
			_id: postId,
			userId
		})

		if (post) {
			post.content = content

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


/**
 * DELETE /post/:postId - Delete a post
 * Người dùng chỉ có thể xóa post của họ
 * 
 * @param postId - id post cần chỉnh sửa
 */
Router.delete('/:postId', postValidator.deletePost(), (req,res) => {
	const errors = validationResult(req);

    if (!errors.isEmpty()) {
		return res.status(400).json({
			ok: false,
			msg: errors.array()[0].msg
		})
    }
	
	const {postId} = req.params
	const {user} = req.body
	const deletePost = async () => {
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