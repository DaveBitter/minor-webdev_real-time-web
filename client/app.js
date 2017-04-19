(function() {
	var elements = {
		taglist: document.getElementById('taglist').childNodes,
		feedtag: document.getElementById('feedtag')
	}

	var socket = io();

	socket.emit('connection', socket.id)

	elements.taglist.forEach(function(item) {
		item.addEventListener('click', function(e) {
			sendTag(e.target.innerHTML)
		})
	})

	socket.on('new tagstream', function(tag) {
		elements.feedtag.innerHTML = tag
	})

	function sendTag(tag) {
		socket.emit('new tag', tag)
	}
})();