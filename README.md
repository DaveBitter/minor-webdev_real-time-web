# Minor WebDev | Real-time Web
Dave Bitter
![app hero](https://raw.githubusercontent.com/DaveBitter/minor-webdev_real-time-web/master/screenshots/hero.jpg)

    V 1.0.1

## General
This repository holds the seperate exercises for the course 'Real-time Web', part of the minor "Webdevelopment" at the [HvA](http://www.hva.nl/)

## Issues
I highly encourage adding issues to this repo in the case of finding one. I'm always up for improving my code.

# HEY LAURENS EN TITUS!!!
Ik heb een app gebouwd met de Instagram API waarbij je kan inloggen op je instagram account en je van je laatst tien post streams kan opengooien op hashtags die je hebt geplaatst. Wanneer je bijvoorbeeld op de hashtag ```#developer``` klik, dan zie je een stream met posts met die hashtag die om de X aantal seconde update.

## Wat is er mis?
Ik heb de oAuth aan de praat gekregen, alles werkt, ON MY MACHINE. Er zijn twee dingen waarom jullie niet de site zelf kunnen testen en hij alleen voor mijn account werkt.

## Punt 1: Code terugkrijgen ipv access token
Na bevestiging van de user krijg ik een code terug in plaats van een access token (die ik nodig heb). Ik vond online dat door bij het requesten ```response_type=token``` toe te voegen aan de query dat je netjes de access token ipv de code terug krijgt. Als dit zo is dan werkt mijn app volledig en kan ik je user data ophalen en querien. Dit is alleen niet het geval aangezien ik een leeg object terug krijg. Via een applicatie online kon ik mijn accesstoken genereren zodat ik tijdens het developen kon faken dat dit werkte. Daarom werkt het op mijn machine dus wel.

## Punt 2: Sandbox Mode
Omdat De instagram API werkt met een sandbox mode moet werkt je auth alleen als je een sandbox user bent. Met andere woorden: voordat de app live gezet wordt en goedgekeurd wordt door instagram moet ik je handmatig als sandbox user toevoegen. zodra punt 1 opgelost is kan ik uiteraard jullie instagram account toevoegen als sandbox user.

## Wat betekent dit
Jullie kunnen mijn code bekijken en zie hoe ik de oAuth doe en de sockets opzet etc. Ik kan jullie voor deze week laten zien dat het werkt, maar dan wel op mijn computer aangezien ik moet inloggen. Wanneer ik punt 1 opgelost heb werkt alles in principe dus dan kunnen jullie mijn app gebruiken met jullie eigen account. Ik hoop ondanks dat de app live op heroku staat maar ik er alleen dus wat mee kan dat jullie middels de code op zicht feedback kunnen geven met de kennis dat de code dus wel werkt. 

## Getting started
### Clone this repo, duh
    git clone https://github.com/DaveBitter/minor-webdev_real-time-web.git
    cd minor-webdev_real-time-web
   
### Install the dependencies
    npm i

### Start up the server
When you run this command, changes in serverside JS files will be watched and the server will restart automatically, changes in clientside JS files will be watched and browserified and the server will be restarted.
    
    npm start

### Additional commands
Browserify clientside JS

    npm run build

Watchify clientside JS

    npm run watch

Clean clientside build.js file

    npm run clean

## License
[MIT](LICENSE.md) © [Dave Bitter](https://github.com/DaveBitter/)