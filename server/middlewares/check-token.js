const {generateAccessToken, verifyAccessToken} = require('../utils.js')
const User = require('../models/user')
const mongoose = require('mongoose')

module.exports = (req,res,next) => {
	const validateToken = async () => {
		const {authorization} = req.headers

		if (authorization) {
			const accessToken = authorization.split(' ')[1]

			const result = verifyAccessToken(accessToken)
			const user = await User.findById(result._id)

			if (user) {
				req.body.user = user
				return next()
			}
		}
		
		return res.status(401).json({
			ok: false, 
			msg: 'Xác thực thất bại!'
		})
	}

	validateToken()
		.catch((err) => {
			console.log(err)
			return res.status(500).json({
				ok: false,
				msg: 'Đã có lỗi xảy ra!'
			})
		})
}