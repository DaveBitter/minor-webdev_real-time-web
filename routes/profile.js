const express = require('express')
const router = express.Router()
const request = require('request')

const client_id = process.env.CLIENTID
const client_secret = process.env.CLIENTSECRET
const redirect_uri = process.env.REDIRECTURI
const access_token = process.env.ACCESSTOKEN

let code = null;

router.get('/', (req, res) => {
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
		const user = body.user
		res.render('templates/profile', {
			user
		})
	})
})

router.get('/hashtag', (req, res) => {
	const url = 'https://api.instagram.com/v1/users/self/media/recent/?count=10&access_token='

	request(url + access_token, function(err, response, body) {
		body = JSON.parse(body)
		const media = body.data

		res.render('templates/hashtag', {media})
	})
})

module.exports = router

