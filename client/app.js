(function() {
	var elements = {
		taglist: document.getElementById('taglist').childNodes,
		topTaglist: document.getElementById('topTaglist'),
		feedtag: document.getElementById('feedtag'),
		feed: document.getElementById('feed')
	}

	var socket = io();

	socket.emit('connection', socket.id)

	elements.taglist.forEach(function(item) {
		item.addEventListener('click', function(e) {
			sendTag(e.target.innerHTML)
		})
	})

	socket.on('top tags', function(tags) {
		console.log(tags)
		var listElements = ""
		tags.forEach(function(tag) {
			listElements += "<li>" + tag.tag + " (" + tag.count + ")</li>"
		})
		elements.topTaglist.innerHTML = listElements
	})


	socket.on('new tagstream', function(tag, tagMedia) {
		var listElements = ""
		tagMedia.forEach(function(item) {
			listElements += '<img src="' + item.images.thumbnail.url + '"/">'
			listElements += '<p><b>' + item.user.username + '</b></p>'
			var tags = "<p>"
			item.tags.forEach(function(tag) {
				tags += "<span>#" + tag + ' </span>'
			})
			tags += "</p>"
			listElements += tags
		})


		elements.feed.innerHTML = listElements
		elements.feedtag.innerHTML = "#" + tag
	})

	function sendTag(tag) {
		socket.emit('new tag', tag)
	}
})();