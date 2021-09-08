const Router = require('express').Router()
const checkToken = require('../middlewares/check-token')

Router.use(checkToken)

Router.get('/', (req,res) => {
// 	const getPosts = async () => { 
// 		const posts = await Post.find({})
// 
// 		return posts
// 	}
// 	
// 	getPosts()
// 		.then((posts) => res.json({
// 			ok: true, 
// 			posts
// 		}))
// 		.catch((err) => res.json({
// 			ok: false, 
// 			msg: 'Đã có lỗi xảy ra!'
// 		}))

	return res.json({
		ok: true,
		msg: 'Lấy bài viết thành công!'
	})
})

// Router.post('/', (req,res) => {
// 	const {content, videoURL} = req.body
// 	const createPost = async () => {}
// 
// 	createPost()
// 		.then((posts) => res.json({
// 			ok: true, 
// 			msg: 'Đăng bài viết thành công!'
// 			posts
// 		}))
// 		.catch((err) => res.json({
// 			ok: false, 
// 			msg: 'Đã có lỗi xảy ra!'
// 		}))
// })
// 
// Router.put('/:postId', (req,res) => {
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