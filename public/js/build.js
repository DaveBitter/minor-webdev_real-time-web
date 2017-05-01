(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function() {
	var elements = {
		taglist: document.getElementById('taglist').childNodes,
		topTaglist: document.getElementById('topTaglist'),
		feedtag: document.getElementById('feedtag'),
		feed: document.getElementById('feed'),
		status: document.getElementById('status')
	}

	var socket = io();

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

	socket.on('connected users', function(amount) {
		elements.status.innerText = 'users currently online: ' + amount
	})

	function sendTag(tag) {
		socket.emit('new tag', tag)
	}

	function bindEventlistener(arr) {
		arr.forEach(function(item) {
			item.addEventListener('click', function(e) {
				console.log(e.target.dataset.tag)
				var tag = e.target.dataset.tag
				sendTag(tag)
			})
		})
	}

})();
},{}]},{},[1]);
