const {generateAccessToken, verifyAccessToken} = require('../utils.js')
const User = require('../models/user')
const mongoose = require('mongoose')

module.exports = (req,res,next) => {
	const validateToken = async () => {
		const {authorization} = req.headers

		// Dev section only
		if (process.env.NODE_ENV==='development') {
			req.body.user = {
				_id: '613c6cc7844318735e8b4a9b'
			}
			return next()
		}

		if (authorization) {
			const accessToken = authorization.split(' ')[1]
			let userData
			
			try {
				const {data} = verifyAccessToken(accessToken)

				userData = data
			}
			catch (err) {
				// Xác thực thất bại khi jwt báo lỗi expired,
				// nếu không thì quăng lỗi như bth
				if (err.name === 'TokenExpiredError') {
					userData = null
				}
				else {
					console.log(err)
					throw err
				}
			}
			
			if (userData) {
				const user = await User.findById(userData._id)

				if (user) {
					req.body.user = user
					return next()
				}
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