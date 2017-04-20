const express = require('express')
const router = express.Router()
const request = require('request')

const client_id = process.env.CLIENTID
const client_secret = process.env.CLIENTSECRET
const redirect_uri = process.env.REDIRECTURI

let code = null;
let access_token = null;

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
	let queryTag = "#canon"
	io.on('connection', function(socket) {
		socket.on('new tag', function(tag) {
			queryTag = tag
		});
		tagQueryEmit(io, queryTag)
		setInterval(function() {
			tagQueryEmit(io, queryTag)
		}, 5000);
	});


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


const tagQueryEmit = (io, queryTag) => {
	queryTag = queryTag.replace('#', '')

	const tagUrl = 'https://api.instagram.com/v1/tags/' + queryTag + '/media/recent?count=10&access_token='

	request(tagUrl + access_token, function(err, response, body) {
		body = JSON.parse(body)
		const tagMedia = body.data

		io.emit('new tagstream', queryTag, tagMedia)

	})
}


module.exports = router