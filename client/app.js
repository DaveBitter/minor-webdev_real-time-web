(function() {
	var socket = io();

	var elements = {
		taglist: document.getElementById('taglist').childNodes,
		topTaglist: document.getElementById('topTaglist'),
		feedtag: document.getElementById('feedtag'),
		feed: document.getElementById('feed'),
		status: document.getElementById('status')
	}

	if ('serviceWorker' in navigator) {
		navigator.serviceWorker.register('/sw.js')
	}

	socket.emit('connection', socket.id)

	bindEventlistener(elements.taglist)

	socket.on('top tags', function(tags) {
		var listElements = ""
		tags.forEach(function(tag) {
			listElements += "<li data-tag=" + tag.tag + ">#" + tag.tag + " (" + tag.count + ")</li>"
		})
		elements.topTaglist.innerHTML = listElements
		bindEventlistener(elements.topTaglist.childNodes)
	})


	socket.on('new tagstream', function(tag, tagMedia) {
		var listElements = ""
		tagMedia.forEach(function(item) {
			listElements += '<div class="col-sm-6 col-md-12 col-lg-6"><section class="card"><img src="' + item.images.thumbnail.url + '"/">'
			listElements += '<p>by <b>' + item.user.username + '</b></p>'
			var tags = "<p>"
			item.tags.forEach(function(tag) {
				tags += "<span>#" + tag + ' </span>'
			})
			tags += "</p></section></div>"
			listElements += tags
		})


		elements.feed.innerHTML = listElements
		elements.feedtag.innerHTML = "#" + tag
	})

	socket.on('no tagstream', function(statuscode) {
		var errorSection = document.getElementById('error')
		var errorCode = document.getElementById('errorCode')

		if (errorSection == null) {
			elements.feed.insertAdjacentHTML('beforeend', '<section id="error" class="card"><article><p id="errorCode">We seem to be unable to connect to Instagram. We will keep retrying. Statuscode (' + statuscode + ')</p></article></section>	');
		} else {
			if(statuscode == 200) {
				return errorSection.parentElement.removeChild(errorSection)
			}
		}

	})

	socket.on('connected users', function(amount) {
		elements.status.innerText = 'users currently online: ' + amount
	})

	function sendTag(tag) {
		socket.emit('new tag', tag)
	}

	function bindEventlistener(arr) {
		arr.forEach(function(item) {
			item.addEventListener('click', function(e) {
				var tag = e.target.dataset.tag
				sendTag(tag)
			})
		})
	}

})();