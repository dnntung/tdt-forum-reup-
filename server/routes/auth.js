const Router = require('express').Router()
const User = require('../models/user')
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt')
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const {verifyRefreshToken, generateAccessToken, generateRefreshToken} = require('../utils.js')

const cookieOptions = {
	httpOnly: true,
	overwrite: true,
	path: '/auth/token',
	maxAge: 7 * 24 * 60 * 60 * 1000 // days * hours * minutes * seconds * ms
}

// Use the GoogleStrategy within Passport.
// Strategies in Passport require a `verify` function, which accept
// credentials (in this case, an accessToken, refreshToken, and Google
// profile), and invoke a callback with a user object.
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
passport.use(new GoogleStrategy({
	    clientID: GOOGLE_CLIENT_ID,
	    clientSecret: GOOGLE_CLIENT_SECRET,
	    callbackURL: "/auth/google/callback"
  	},
  	// Khi lấy thành công thông tin từ phiên xác thực, đính kèm thông tin
  	// thông tin đó vào request thông qua done() để truyền tiếp cho callbackURL
  	// Lưu ý: Chỉ những tài khoản có email là @student.tdtu.edu.vn
  	// mới được phép đăng nhập hệ thống
 	function(accessToken, refreshToken, profile, done) {
 		const {email, picture} = profile['_json']
 		const getUser = async () => {
 			const user = await User.findOne({googleId: profile.id})

 			if (user) {return done(null, user)}

 			const studentEmail = /([a-zA-Z0-9]+)@student.tdtu.edu.vn$/.exec(email)

			if (!studentEmail) {
	 			return done(null, false, {message: 'Vui lòng sử dụng email sinh viên!'})
	 		}

	 		const studentId = studentEmail[1]
 			const newUser = new User({
 				googleId: profile.id,
 				studentId,
 				displayName: profile.displayName,
 				picture: picture,
 				roleId: 2
 			})

 			return done(null, await newUser.save())
 		}
 		getUser().catch((err) => done(err))
  	}
));
// passport.use(new LocalStrategy({
// 		usernameField: 'userId',
// 		passwordField: 'password'
// 	},
// 	function(username, password, done) {
// 		const getUser = async () => {
// 			const user = await User.findOne({userId: username})
// 
// 			if (!user) {return done(null, false, {message: 'Tài khoản không tồn tại!'})}
// 
// 			console.log(user)
// 			const hashedPassword = user.password
// 			const result = await bcrypt.compare(password, hashedPassword)
// 
// 			if (!result) {return done(null, false, {message: 'Mật khẩu không đúng!'})}
// 
// 			return done(null, user) 
// 		}
// 
// 		getUser().catch((err) => done(err))
// 	}
// ));

// GET /auth/google
// Use passport.authenticate() as route middleware to authenticate the
// request.  The first step in Google authentication will involve
// redirecting the user to google.com.  After authorization, Google
// will redirect the user back to this application at /auth/google/callback
Router.get('/google',
	passport.authenticate('google', { scope: ['profile', 'email'] })
);

// GET /auth/google/callback
// Use passport.authenticate() as route middleware to authenticate the
// request.  If authentication fails, the user will be redirected back to the
// login page.  Otherwise, the primary route function function will be called,
// which, in this example, will redirect the user to the home page.
Router.get('/google/callback', (req, res, next) => {
	passport.authenticate('google', function(err, user, info) {
	    if (err) {
	    	console.log(err)
	    	return res.status(500).json({
	    		ok: false,
	    		msg: 'Đã có lỗi xảy ra!'
	    	})
	    }
	    if (!user) {
	    	return res.status(404).json({
	    		ok: false,
	    		msg: info.message
	    	})
	    }

	    const {studentId, picture, displayName} = user
	    const accessToken =  generateAccessToken(user)
		const refreshToken = generateRefreshToken(user)

	    return res
	    	.cookie('refreshToken', refreshToken, cookieOptions)
		    .json({
		      	ok: true, 
		      	msg: 'Đăng nhập thành công!',
		      	data: {
		      		studentId,
		      		picture,
		      		displayName,
		      		accessToken
		      	}		      	
	      	})
  	})(req, res, next);
});

// Router.post('/', (req,res,next) => {
// 	passport.authenticate('local', function(err, user, info) {
// 	    if (err) {
// 	    	console.log(err)
// 	    	return res.json({
// 	    		ok: false,
// 	    		msg: 'Đã có lỗi xảy ra!'
// 	    	})
// 	    }
// 	    if (!user) {
// 	    	return res.json({
// 	    		ok: false,
// 	    		msg: info.message
// 	    	})
// 	    }
// 	    return res.json({
// 	      	ok: true, 
// 	      	msg: 'Đăng nhập thành công',
// 	      	user
//       	})
//   	})(req, res, next);
// })

// Kiểm tra refresh token và cấp access token mới
Router.get('/token', (req,res) => {
	const validateToken = async () => {
		const {refreshToken} = req.cookies

		if (refreshToken) {
			let userData
			
			try {
				const {data} = verifyRefreshToken(refreshToken)
				userData = data
			}
			catch (err) {
				// Trả về null khi jwt báo lỗi expired,
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

				return user
			}
		}

		return null
	}

	validateToken()
		.then((user) => {
			// Nếu user != null thì cấp access token mới,
			// ngược lại báo lỗi xác thực
			if (user) {
				const newAccessToken =  generateAccessToken(user)
				const newRefreshToken = generateRefreshToken(user)

				return res
					.cookie('refreshToken', newRefreshToken, cookieOptions)
					.json({
						ok: true,
						msg: 'Cập nhật Token thành công!',
						data: {accessToken: newAccessToken}
					})
			}

			return res.status(401).json({
					ok: false, 
					msg: 'Xác thực thất bại! Vui lòng đăng nhập lại!'
				})
		})
		.catch((err) => {
	    	console.log(err)
			res.status(500).json({
					ok: false,
					msg: 'Đã có lỗi xảy ra!'
				})
		})
})

module.exports = Router