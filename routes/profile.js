const express = require('express')
const router = express.Router()
const request = require('request')

const client_id = process.env.CLIENTID
const client_secret = process.env.CLIENTSECRET
const redirect_uri = process.env.REDIRECTURI

let code = null;
let access_token = null;

let clients = []

router.get('/', (req, res) => {
	// Incoming from redirect from Instagram oAuth
	code = req.query.code
	const url = "https://api.instagram.com/oauth/access_token";
	const options = {
		url: url,
		method: "POST",
		form: {
			client_id: client_id,
			client_secret: client_secret,
			grant_type: 'authorization_code',
			redirect_uri: redirect_uri,
			code: code
		},
		json: true
	}

	request(options, function(err, response, body) {
		if (body.code == 400) {
			res.redirect('/')
		}
		access_token = body.access_token
		const user = body.user
		res.render('templates/profile', {
			user
		})
	})
})

router.get('/hashtag', (req, res) => {
	const io = req.app.locals.settings.io
	io.on('connection', function(socket) {
		if (clients.filter(client => client.id == socket.id).length > 0) {
			return
		}

		clients.push({
			id: socket.id,
			tag: "#canon"
		})

		console.info('Client (' + socket.id + ') connected!')
		console.info('Total of connected clients: ' + clients.length)
		
		socket.on('new tag', function(tag) {
			clients.map((client) => {
				if (client.id == socket.id) {
					client.tag = tag
				}
			})
		});

		socket.on('disconnect', function() {
			let i = clients.indexOf(socket);
			clients.splice(i, 1);
			
			console.info('Client (' + socket.id + ') disconnected!')
			console.info('Total of connected clients: ' + clients.length)
		});
	});

	setInterval(function() {
		clients.forEach((client) => {
			tagQueryEmit(io, client)
		})
	}, 5000);


	const url = 'https://api.instagram.com/v1/users/self/media/recent/?count=10&access_token='

	request(url + access_token, function(err, response, body) {
		body = JSON.parse(body)
		const media = body.data

		const tags = getTags(media)

		res.render('templates/hashtag', {
			media,
			tags
		})
	})
})

const getTags = (media) => {
	const tags = []
	media.forEach((item) => {
		item.tags.forEach((tag) => {
			tags.push(tag)
		})
	})
	return unique(tags)

}

const unique = (arr) => {
	const seen = {};
	return arr.filter(function(item) {
		return seen.hasOwnProperty(item) ? false : (seen[item] = true);
	});

}


const tagQueryEmit = (io, client) => {
	const queryTag = client.tag.replace('#', '')

	const tagUrl = 'https://api.instagram.com/v1/tags/' + queryTag + '/media/recent?count=10&access_token='

	request(tagUrl + access_token, function(err, response, body) {
		body = JSON.parse(body)
		const tagMedia = body.data

		io.to(client.id).emit('new tagstream', queryTag, tagMedia);

	})
}


module.exports = router