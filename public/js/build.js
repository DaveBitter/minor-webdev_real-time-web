(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function() {
	var elements = {
		taglist: document.getElementById('taglist').childNodes,
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
},{}]},{},[1]);
