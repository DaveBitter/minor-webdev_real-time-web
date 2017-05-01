# Minor WebDev | Real-time Web 
Dave Bitter 

![app hero](https://raw.githubusercontent.com/DaveBitter/minor-webdev_real-time-web/develop/screenshots/app_0_hero.jpg) 

## Mirror Stream
    V 1.0.2
 
## General 
This repository holds the code for the course 'Real-time Web', part of the minor "Webdevelopment" at the [HvA](http://www.hva.nl/) 
 
## Issues 
I highly encourage adding issues to this repo in the case of finding one. I'm always up for improving my code. 
 
## Features 
* Instagram oAuth authentication 
* Show user's latest post and all the used hashtags 
* Open stream with post with the hashtag a user selects through Socket.io 
 
### Instagram oAuth authentication
![oath step 1](https://raw.githubusercontent.com/DaveBitter/minor-webdev_real-time-web/develop/screenshots/oath_0_hero.jpg)
![oath step 2](https://raw.githubusercontent.com/DaveBitter/minor-webdev_real-time-web/develop/screenshots/oath_1_hero.jpg) 
![oath step 3](https://raw.githubusercontent.com/DaveBitter/minor-webdev_real-time-web/develop/screenshots/oath_2_hero.jpg) 

The app is limited due to Instagrams strictness with their API. The app is currently is [Sandbox mode](https://www.Instagram.com/developer/Sandbox/). 
 
#### TL:DR; 
Firstly, I have to authorize your Instagram account as a Sandbox-user for this app.  
 
Secondly, you have to accept this invitation [here](https://www.Instagram.com/developer/clients/Sandbox_invites/). Note that you have to have developer account at Instagram to view this page. 
 
Great! You should be able to now go through the oAuth flow. Final thing though. The posts on Instagram that can be accessed in the app is limited to the posts of the Sandbox users. This means that the stream won't show new posts at a crazy rate, because their are a few users, the Sandbox users, that post. 
 
This should al be fixed when the app is authorized by Instagram, which is a pain in the butt. Please accept this for now. 

## Show user's latest post and all the used hashtags 
![hashtags dashboard page](https://raw.githubusercontent.com/DaveBitter/minor-webdev_real-time-web/develop/screenshots/app_0_hero.jpg)

The user can see the last images they posted to Instagram, inluding the hashtags per post. On a second column, the user can see a list of all the hashtag used in these posts together.

## Open stream with post with the hashtag a user selects through Socket.io 
![post stream selected hashtag](https://raw.githubusercontent.com/DaveBitter/minor-webdev_real-time-web/develop/screenshots/app_1_hero.jpg)
 
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
 