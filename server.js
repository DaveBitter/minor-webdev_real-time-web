const express = require('express')
const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const port = process.env.PORT || 1337
const path = require('path')


const indexRouter = require('./routes/index.js')

io.on('connection', function(socket){
  socket.on('chat message', function(msg, username){
    io.emit('chat message', msg, username)
  });

  socket.on('new user', function(username) {
  	io.emit('new user', username)
  })
});

app
	.set('view engine', 'pug')
	.use(express.static('public'))
	.use('/', indexRouter)

http.listen(port, function(){
  console.log('listening on http://localhost:' + port);
});

