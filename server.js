require('dotenv').config();
const express = require('express')
const app = require('express')()
const request = require('request')
const http = require('http').Server(app)
const io = require('socket.io')(http)
const port = process.env.PORT || 1337
const path = require('path')


const indexRouter = require('./routes/index.js')
const oathRouter = require('./routes/oath.js')

io.on('connection', function(socket) {
	console.log("client connected!", socket.id)
});

const client_id = process.env.CLIENTID
const client_secret = process.env.CLIENTSECRET
const redirect_uri = process.env.REDIRECTURI

app
	.set('view engine', 'pug')
	.use(express.static('public'))
	.use('/', indexRouter)
	.use('/oath', oathRouter)

app.get('/login', function(req, res) {
	res.redirect('https://api.instagram.com/oauth/authorize/?client_id=' + client_id + '&redirect_uri=' + redirect_uri + '&response_type=code')
})

http.listen(port, function() {
	console.log('listening on http://localhost:' + port);
});