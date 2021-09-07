// Set up enviroment variables for use
const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const db = require('./db')
const app = express()

app.use(express.urlencoded({extended: false}))

// Routes
const authRouter = require('./routes/auth')
app.use('/auth', authRouter)

app.get('/', (req,res) => {
	return res.json({
		ok: true
	})
})

const PORT = process.env.PORT
app.listen(PORT, () => console.log('Server running at localhost:'+PORT))