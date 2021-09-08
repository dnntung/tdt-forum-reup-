// Set up enviroment variables for use
require('dotenv').config()

const express = require('express')
const db = require('./db')
const cookieParser = require("cookie-parser");

const app = express();

app.use(cookieParser());
app.use(express.urlencoded({extended: false}))

// Routes
const authRouter = require('./routes/auth')
const postRouter = require('./routes/post')
app.use('/auth', authRouter)
app.use('/post', postRouter)

app.get('/', (req,res) => {
	return res.json({
		ok: true
	})
})

const PORT = process.env.PORT
app.listen(PORT, () => console.log('Server running at localhost:'+PORT))