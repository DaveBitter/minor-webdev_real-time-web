require('dotenv').config();
const express = require('express')
const app = require('express')()
const request = require('request')
const http = require('http').Server(app)
const io = require('socket.io')(http)
const port = process.env.PORT || 1337
const path = require('path')
const session = require('express-session')


const indexRouter = require('./routes/index.js')
const profileRouter = require('./routes/profile.js')


// io.on('connection', function(socket) {
// 	console.log("client connected!", socket.id)
// });

const client_id = process.env.CLIENTID
const client_secret = process.env.CLIENTSECRET
const redirect_uri = process.env.REDIRECTURI

app
	.use(session({
		secret: 'mByECLHdbsU8VMGmyvMlR0N1eUCegJqgaETFLT16LskUlrJmdqZgvOaqugaq4P3VHxMfOOaVgLvBdAiEHX5soJcPhwD4imwN1IET',
		resave: false,
		saveUninitialized: true,
		cookie: {
			secure: true,
		}
	}))
	.set('view engine', 'pug')
	.set("io", io)
	.use(express.static('public'))
	.use('/', indexRouter)
	.use('/profile', profileRouter)

app.get('/login', function(req, res) {
	res.redirect('https://api.instagram.com/oauth/authorize/?client_id=' + client_id + '&redirect_uri=' + redirect_uri + '&response_type=code&scope=public_content')
})

http.listen(port, function() {
	console.log('listening on http://localhost:' + port);
});

