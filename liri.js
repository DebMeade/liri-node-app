require("dotenv").config();
var Spotify = require("node-spotify-api");
var keys = require("./keys");
var request = require("request");
var moment = require("moment");
moment().format();
var fs = require("fs");

var command = process.argv[2];
var option = process.argv.slice(3).join("+");

function run() {
switch(command) {
    case "concert-this":
        // console.log("concertSearch");
        concertSearch(option);
        break
    
    case "spotify-this-song":
        // console.log("songSearch");
        songSearch(option);
        break

    case "movie-this":
        // console.log("movieSearch");
        movieSearch(option);
        break
    
    case "do-what-it-says":
        // console.log("read");
        justDoIt(option);
        break

    default:
        console.log("incorrectCommand");
}
}


function songSearch(songName) {
        
    if(!songName) {
        songName = "The sign"
    };
    
    var spotify = new Spotify(keys.spotify);
    spotify.search({ type: "track", query: songName}, function(err, data) {
        if (err) {
            return console.log("Error occurred: " + err);
        }
        // console.log(data.tracks.items[0]);
        var trackName = data.tracks.items[0].name
        var artistName = data.tracks.items[0].artists[0].name
        var previewUrl = data.tracks.items[0].preview_url
        var albumName = data.tracks.items[0].album.name
        
        var songList = `
        Name: ${trackName}
        Artist: ${artistName}
        URL: ${previewUrl}
        Album: ${albumName}
        `;
        var divider = "\n\n==================================\n\n";

        console.log(songList);
        // console.log(`
        //     Name: ${trackName}
        //     Artist: ${artistName}
        //     URL: ${previewUrl}
        //     Album: ${albumName}
        // `)
        fs.appendFile("log.txt", songList + divider, function(err) {
            if(err) {
                return console.log(err);
            }
        } )

    })
}

function movieSearch(movieName) {
    
    if(!movieName) {
        movieName = "Mr. Nobody"
    };

    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy"

    request(queryUrl, function(error, response, body) {     //why does response need to be there?
        if (error) {
            return console.log("Error occurred: " + error);

        } 
        // console.log(JSON.parse(body));      //This allows you to see the object in git as a list

        var movieTitle = JSON.parse(body).Title
        var movieYear = JSON.parse(body).Year
        var movieImdb = JSON.parse(body).imdbRating
        var movieRotten = JSON.parse(body).Ratings[1].Value
        var movieCountry = JSON.parse(body).Country
        var movieLanguage = JSON.parse(body).Language
        var moviePlot = JSON.parse(body).Plot
        var movieActors = JSON.parse(body).Actors


        var movieList = `
        Title: ${movieTitle}
        Year: ${movieYear}
        IMDB Rating: ${movieImdb}
        Rotten Tomatoes Rating: ${movieRotten}
        Country Produced in: ${movieCountry}
        Language: ${movieLanguage}
        Plot: ${moviePlot}
        Actors: ${movieActors}
        `

        var divider = "\n\n==================================\n\n";

        console.log(movieList);

        fs.appendFile("log.txt", movieList + divider, function(err) {
            if(err) {
                return console.log(err);
            }
        } )
        // console.log(`
        //     Title: ${movieTitle}
        //     Year: ${movieYear}
        //     IMDB Rating: ${movieImdb}
        //     Rotten Tomatoes Rating: ${movieRotten}
        //     Country Produced in: ${movieCountry}
        //     Language: ${movieLanguage}
        //     Plot: ${moviePlot}
        //     Actors: ${movieActors}
        //      `)
    })
    

}

function concertSearch(artistName) {

    if(!artistName) {
        artistName = "Ace of Base"
    };
    var queryUrl = "https://rest.bandsintown.com/artists/" + artistName + "/events?app_id=codingbootcamp"

    request(queryUrl, function(error, response, body) {
        
        if(error) {
            return console.log("Error occurred: " + error);
        }
        // console.log(JSON.parse(body));
        
        var bandName = JSON.parse(body)[0].lineup[0]
        var venueName = JSON.parse(body)[0].venue.name
        var venueLocation = JSON.parse(body)[0].venue.city + ", " + JSON.parse(body)[0].venue.country
        var date = JSON.parse(body).datetime
        date = moment(date).format("MM/DD/YYYY");


        var artistList = 
        `
        Artist Name: ${bandName}
        Venue Name: ${venueName}
        Venue Location: ${venueLocation}
        Concert Date: ${date}
            `
        var divider = "\n\n==================================\n\n";

        console.log(artistList);

        // console.log(`
        // Venue Name: ${venueName}
        // Venue Location: ${venueLocation}
        // Concert Date: ${date}
        //     `)
        fs.appendFile("log.txt", artistList + divider, function(err) {
            if(err) {
                return console.log(err);
            }
        } )
    })
}

function justDoIt () {

    fs.readFile("random.txt", "utf8", function(error, data) {
        if(error) {
            return console.log("Error occurred " + error);
        } 
        // console.log(data);
        // option = data;
        // songSearch(option);
        var dataArr = data.split(", ");
        console.log(dataArr);

        command = dataArr[0]
        option = dataArr[1]
        run()
        
    })
}

run()