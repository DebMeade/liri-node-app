# liri-node-app

Liri is a Language Interpretation and Recognition Interface.  It is a command line node app which takes in commands and provides the requested data.

Liri can search for songs, movies and artsits.  If you are interested in searching for a song you would enter something similar to the following:
node liri.js spotify-this-song sour patch kids
node liri.js concert-this jason aldean
node liri.js movie-this point break

There are also defaults set up in case no information is added following "spotify-this-song", "conert-this" or "movie-this".

One additional command is: node liri.js do-what-it-says which reads from the random.txt file which returns data on the song titled I Want It That Way.

Every search made on Liri will show in the terminal/bash window as well as in the log.txt file