const express = require('express')
const router = express.Router()
const request = require('request')


router.get('/', (req, res) => {
	const client_id = process.env.CLIENTID
	const client_secret = process.env.CLIENTSECRET
	const redirect_uri = process.env.REDIRECTURI

	const url = "https://api.instagram.com/oauth/access_token";
	const code = req.query.code
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

module.exports = router