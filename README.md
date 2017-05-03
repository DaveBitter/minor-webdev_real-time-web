# Minor WebDev | Real-time Web 
Dave Bitter 

![app hero](https://raw.githubusercontent.com/DaveBitter/minor-webdev_real-time-web/master/screenshots/hero.jpg) 

## Mirror Stream
    V 1.1.1
 
## General 
This repository holds the code for the course 'Real-time Web', part of the minor "Webdevelopment" at the [HvA](http://www.hva.nl/) 
 
## Issues 
I highly encourage adding issues to this repo in the case of finding one. I'm always up for improving my code. 

## Table Of Contents
* [Features ](#features)
* [Emitted Socket Events](#emitted-socket-events)
* [Live Demo ](#live-demo)
* [Getting started ](#getting-started)
* [License ](#license)

## Features 
* [Instagram oAuth authentication ](#Instagram-oAuth-authentication)
* [Show user's latest post and all the used hashtags](#show-users-latest-post-and-all-the-used-hashtags)
* [Open stream with post with the hashtag a user selects through Socket.io ](#open-stream-with-post-with-the-hashtag-a-user-selects-through-socketio)
* [Most clicked hashtags, only sent if new information (MongoDB)](#most-clicked-hashtags-only-sent-if-new-information-mongodb)
* [Service Worker and Progressive Web-app](service-worker-and-progressive-web-app)
* [API Error Handling](api-error-handling)
 
### Instagram oAuth authentication
![oAuth step 1](https://raw.githubusercontent.com/DaveBitter/minor-webdev_real-time-web/master/screenshots/oauth_0_hero.jpg)
![oAuth step 2](https://raw.githubusercontent.com/DaveBitter/minor-webdev_real-time-web/master/screenshots/oauth_1_hero.jpg) 
![oAuth step 3](https://raw.githubusercontent.com/DaveBitter/minor-webdev_real-time-web/master/screenshots/oauth_2_hero.jpg) 

The app is limited due to Instagram's strictness with their API. The app is currently is [Sandbox mode](https://www.Instagram.com/developer/Sandbox/). 
 
#### TL:DR; 
Firstly, I have to authorize your Instagram account as a Sandbox-user for this app.  
 
Secondly, you have to accept this invitation [here](https://www.Instagram.com/developer/clients/Sandbox_invites/). Note that you have to have developer account at Instagram to view this page. 
 
Great! You should be able to now go through the oAuth flow. Final thing though. The posts on Instagram that can be accessed in the app is limited to the posts of the Sandbox users. This means that the stream won't show new posts at a crazy rate, because their are a few users, the Sandbox users, that post. 
 
This should al be fixed when the app is authorized by Instagram, which is a pain in the butt. Please accept this for now. 

### Show user's latest post and all the used hashtags 
![hashtags dashboard page](https://raw.githubusercontent.com/DaveBitter/minor-webdev_real-time-web/master/screenshots/app_0_hero.jpg)

The user can see the last images they posted to Instagram, nicluding the hashtags per post. On a second column, the user can see a list of all the hashtag used in these posts together.

### Open stream with post with the hashtag a user selects through Socket.io 
![post stream selected hashtag](https://raw.githubusercontent.com/DaveBitter/minor-webdev_real-time-web/master/screenshots/app_1_hero.jpg)

A user can click on one of the hashtags to open up a stream with post that contain that hashtag. Every X amount of seconds a fresh set of posts is send over the socket connection. Which user gets which posts based on their hashtag is stored on the server side of this application.

### Most clicked hashtags, only sent if new information (MongoDB)
Whenever a user clicks on a hashtag the count for that hashtag goes up. Every X amount of seconds the top ten hashtags get send to the 'Top Hashtags By Users' section. Each time, the server will check whether the information is identical to the previously send information. If this is true, nothing will be sent. The storing of this data happens with MongoDB.

### Service Worker and Progressive Web-app
![service worker in action](https://raw.githubusercontent.com/DaveBitter/minor-webdev_real-time-web/master/screenshots/sw_0_hero.jpg)

If connection between the client and the server is lost the Service Worker kicks in. It will display a user with feedback about what possibly happened. It will also link to Instagram's hashtag search page so the user can still look at the posts for that hashtag.

### API Error Handling
![api error handling in action](https://raw.githubusercontent.com/DaveBitter/minor-webdev_real-time-web/master/screenshots/app_2_hero.jpg)

If the API throws an error the error will be handled by showing the user that something went wrong along with the statuscode.

![api down handling in action](https://raw.githubusercontent.com/DaveBitter/minor-webdev_real-time-web/master/screenshots/app_3_hero.jpg)

If the api goes down and we can do a request a page will be displayed in order with a link to the instagram search page.

## Emitted Socket Events
### Server
* [```connected users (on event)```](#connected-users-on-event)
* [```top tags (stream)```](#top-tags-stream)
* [```new tagstream (stream)```](#new-tagstream-stream)
* [```no tagstream (on event)```](#no-tagstream-on-event)

#### ```connected users (on event)```
This will emit the current amount of users that are online on the app on the event of a user that connects or disconnect.

#### ```top tags (on event)```
This will emit the top clicked hashtags by users every X amount of seconds. The information will be queried on the MongoDB and only emitted if the data is different than the previous emit.

#### ```new tagstream (stream)```
This will emit the latest posts for the selected hashtag per user every X amount of seconds.

#### ```no tagstream (on event)```
This will emit the statuscod. On the client the message will be displayed at the top of the feed.

### Client
* [```connection (on event)```](#connection-on-event)
* [```new tag (on event)```](#new-tag-on-event)

#### ```connection (on event)```
This will emit the new connection with the socket information (like the socket id) to be registered on the server side.

#### ```new tag (on event)```
This will emit a newly selected hashtag by the user on the client side to the server side. On the server the client's hashtag to stream posts with will be updated aswell as the 'Top Hashtags By Users'.

## Live Demo 
Taken al this in account, you can view the app [here](https://minor-webdev-real-time-web.herokuapp.com/). 
 
## Getting started 
### Clone this repo, duh 
    git clone https://github.com/DaveBitter/minor-webdev_real-time-web.git 
    cd minor-webdev_real-time-web 

### Install the dependencies 
    npm i 
 
### Populate the ```.env``` file 
Save the ```example.env``` as ```env``` and fill in the values. 
You will need to get the keys from the Instagram API aswell as set-up a MongoDB database.
 
### Start up the server 
When you run this command, changes in server side JS files will be watched and the server will restart automatically, changes in client side JS files will be watched and browserified and the server will be restarted. 
     
    npm start 
 
### Additional commands 
Browserify client side JS 
 
    npm run build 
 
Watchify client side JS 
 
    npm run watch 
 
Clean client side build.js file 
 
    npm run clean 
 
## License 
[MIT](LICENSE.md) © [Dave Bitter](https://github.com/DaveBitter/) 
 
