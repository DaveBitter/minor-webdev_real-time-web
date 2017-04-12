$(function() {
	var socket = io();
	var username = prompt("What's your name?");

	socket.emit('new user', username)


	$('form').submit(function() {
		socket.emit('chat message', $('#m').val(), username);
		$('#m').val('');
		return false;
	});
	socket.on('chat message', function(msg, passedUsername) {
		if (username == passedUsername) {
			$('#messages').append($('<li>').addClass('text-right').text(passedUsername + ': ' + msg));
		} else {
			$('#messages').append($('<li>').text(passedUsername + ': ' + msg));
		}
		window.scrollTo(0, document.body.scrollHeight);
	});
	socket.on('new user', function(username) {
		$('#messages').append($('<li>').text(username + " joined!"));
		window.scrollTo(0, document.body.scrollHeight);
	});
});