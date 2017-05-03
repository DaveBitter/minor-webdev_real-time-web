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
	// incoming from redirect from Instagram oAuth
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
	// get user profile data
	request(options, function(err, response, body) {
		if (err !== null) {
			res.render('templates/error')
		} else {
			if (body.code == 400) {
				return res.redirect('/')
			}
			access_token = body.access_token
			const user = body.user
			res.render('templates/profile', {
				user
			})
		}

	})
})

router.get('/hashtag', (req, res) => {
	const io = req.app.locals.settings.io
	const tagCollection = db.collection('hashtags');
	let queriedTags = []

	io.on('connection', function(socket) {
		// check if client is already in clients array
		// prevents duplicates
		if (clients.filter(client => client.id == socket.id).length > 0) {
			return
		}

		// add client to array of known clients 
		// give inital tag
		// TODO: make the initial tag based on random tag of client
		clients.push({
			id: socket.id,
			tag: "#canon"
		})

		// showing what's going on
		console.info('Client (' + socket.id + ') connected!')
		console.info('Total of connected clients: ' + clients.length)
		io.emit('connected users', clients.length)

		// event where user clicks on a new hashtag
		socket.on('new tag', function(tag) {
			// update tag in clients array for client
			clients.map((client) => {
				if (client.id == socket.id) {
					client.tag = tag
				}
			})

			let updateData = {}
			let exists = false

			// update amout of times clicked on tag
			queriedTags.map((queriedTag) => {
				if (queriedTag.tag == tag) {
					exists = true
					updateData = queriedTag
					updateData.count++
				}
			})

			// add tag to db if new
			// update tag in db if not new
			if (exists == true) {
				tagCollection.findOne({
					_id: updateData._id
				}, function(err, result) {
					tagCollection.updateOne(result, {
						$set: updateData
					}, (error, result) => {
						if (err) return console.log(err);
					});
				});
			} else {
				tagCollection.save({
					tag: tag,
					count: 1
				}, (err, result) => {
					if (err) return console.log(err);
				});
			}
		});

		socket.on('disconnect', function() {
			// remove client from array of know clients
			let i = clients.indexOf(socket);
			clients.splice(i, 1);

			// showing what's going on
			console.info('Client (' + socket.id + ') disconnected!')
			console.info('Total of connected clients: ' + clients.length)
			io.emit('connected users', clients.length)

		});
		clients.forEach((client) => {
			tagQueryEmit(io, client, res)
			tagCollection.find({}, {}).toArray(function(err, tags) {
				io.emit('top tags', tags)
			})
		})
	});

	// polling of media with the selected tag every X amount of seconds for each client seperatly
	setInterval(function() {
		clients.forEach((client) => {
			tagQueryEmit(io, client, res)
		})
	}, 5000);

	setInterval(() => {
		tagCollection.find({}, {}).toArray(function(err, tags) {
			tags.sort(compare)
			tags.slice(0, 10)

			// check if your not re-sending the exact same data
			if (arraysEqual(tags, queriedTags) !== true) {
				io.emit('top tags', tags)
			}
			queriedTags = tags
		});
	}, 100)

	// Get the last ten posts of client
	const url = 'https://api.instagram.com/v1/users/self/media/recent/?count=10&access_token='

	request(url + access_token, function(err, response, body) {
		if (err !== null) {
			res.render('templates/error')
		} else {
			body = JSON.parse(body)
			if (body.code == 429) {
				console.error('Error (' + body.code + '): ' + body.error_type)
				return res.redirect('/')
			}

			const media = body.data

			// get al list of hashtags used in the last ten posts
			const tags = getTags(media)

			res.render('templates/hashtag', {
				media,
				tags
			})
		}
	})
})

const getTags = (media) => {
	// get al list of hashtags used in the last ten posts
	const tags = []
	media.forEach((item) => {
		item.tags.forEach((tag) => {
			tags.push(tag)
		})
	})

	// remove duplicate hashtags
	return unique(tags)

}

const unique = (arr) => {
	// remove duplicates in array
	const seen = {};
	return arr.filter(function(item) {
		return seen.hasOwnProperty(item) ? false : (seen[item] = true);
	});

}

// check if array is identical to an other
// modified code from http://stackoverflow.com/a/4025958/7885680
function arraysEqual(arr1, arr2) {
	if (arr1.length !== arr2.length)
		return false;
	for (var i = arr1.length; i--;) {
		if (arr1[i].tag !== arr2[i].tag)
			return false;
	}

	return true;
}

function compare(a, b) {
	if (a.count < b.count)
		return 1;
	if (a.count > b.count)
		return -1;
	return 0;
}


const tagQueryEmit = (io, client, res) => {
	// getting rid of '#' symbol
	const queryTag = client.tag.replace('#', '')

	// get al list of the latest ten posts that used the selected hashtag
	const tagUrl = 'https://api.instagram.com/v1/tags/' + queryTag + '/media/recent?count=10&access_token='

	// query on hashtag
	request(tagUrl + access_token, function(err, response, body) {
		if (err !== null) {
			res.render('templates/error')
		} else {
			body = JSON.parse(body)
			const statuscode = body.meta.code

			if (statuscode == 200) {
				const tagMedia = body.data
				// emmiting media to client
				io.to(client.id).emit('new tagstream', queryTag, tagMedia);
			} else {
				io.to(client.id).emit('no tagstream', statuscode);

			}
		}

	})
}


module.exports = router