const Router = require('express').Router()
const User = require('../models/user')
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt')
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

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

 			const newUser = new User({
 				googleId: profile.id,
 				displayName: profile.displayName,
 				picture: picture,
 				role: {
 					type: 2,
 					name: 'Sinh viên'
 				}
 			})

 			return done(null, await newUser.save())
 		}

 		if (!email.includes('@student.tdtu.edu.vn')) {
 			return done(null, false, {message: 'Vui lòng sử dụng email sinh viên!'})
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
	    	return res.json({
	    		ok: false,
	    		msg: 'Đã có lỗi xảy ra!'
	    	})
	    }
	    if (!user) {
	    	return res.json({
	    		ok: false,
	    		msg: info.message
	    	})
	    }
	    return res.json({
	      	ok: true, 
	      	msg: 'Đăng nhập thành công',
	      	user
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

module.exports = Router