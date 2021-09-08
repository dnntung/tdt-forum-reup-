const jwt = require('jsonwebtoken')

const ACCESS_TOKEN_EXP = '15m'
const REFRESH_TOKEN_EXP = '7d'
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET

exports.generateAccessToken = (user) => {
	return jwt.sign(user.toJSON(), ACCESS_TOKEN_SECRET, {expiresIn: ACCESS_TOKEN_EXP})
} 
exports.generateRefreshToken = (user) => {
	return jwt.sign(user.toJSON(), REFRESH_TOKEN_SECRET, {expiresIn: REFRESH_TOKEN_EXP})
} 
exports.verifyAccessToken = (accessToken) => {
	return jwt.verify(accessToken, ACCESS_TOKEN_SECRET)
}
exports.verifyRefreshToken = (refreshToken) => {
	return jwt.verify(refreshToken, REFRESH_TOKEN_SECRET)
}