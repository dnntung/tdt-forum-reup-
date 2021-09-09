const jwt = require('jsonwebtoken')

const ACCESS_TOKEN_EXP = '15m'
const REFRESH_TOKEN_EXP = '7d'
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET

exports.generateAccessToken = (user) => {
	return jwt.sign({data: user}, ACCESS_TOKEN_SECRET, {expiresIn: ACCESS_TOKEN_EXP})
} 
exports.generateRefreshToken = (user) => {
	return jwt.sign({data: user}, REFRESH_TOKEN_SECRET, {expiresIn: REFRESH_TOKEN_EXP})
} 
exports.verifyAccessToken = (accessToken) => {
	return jwt.verify(accessToken, ACCESS_TOKEN_SECRET)
}
exports.verifyRefreshToken = (refreshToken) => {
	return jwt.verify(refreshToken, REFRESH_TOKEN_SECRET)
}

/**
 * JavaScript function to match (and return) the video Id 
 * of any valid Youtube Url, given as input string.
 * @author: Stephan Schmitz <eyecatchup@gmail.com>
 * @url: https://stackoverflow.com/a/10315969/624466
 */
exports.ytVidId = (url) => {
  var p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
  return (url.match(p)) ? RegExp.$1 : false;
}