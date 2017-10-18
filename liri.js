// Include NPM packages
var request = require("request");
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var fs = require("fs");

// Grab the api keys from the .keys file
var mediaKeys = require("./keys.js");

// Store twitter api keys in variables
var tweetConsumer = mediaKeys.twitterKeys.consumer_key;
var tweetConsumer_secret = mediaKeys.twitterKeys.consumer_secret;
var tweetAccess_token_key = mediaKeys.twitterKeys.access_token_key;
var tweetAccess_token_secret = mediaKeys.twitterKeys.access_token_secret;

// Store spotify api keys in variables
var spotifyId = mediaKeys.spotifyKeys.client_id;
var spotifySecret = mediaKeys.spotifyKeys.client_secret;

var client = new Twitter({
    consumer_key: tweetConsumer,
    consumer_secret: tweetConsumer_secret,
    access_token_key: tweetAccess_token_key,
    access_token_secret: tweetAccess_token_secret
});

var spotify = new Spotify({
    id: spotifyId,
    secret: spotifySecret
});

// Declare variables for user input from the command line
var commands = process.argv[2];
var userInput = process.argv[3];

switch (commands) {
    default: console.log("You've entered an incorrect command. " +
        "Please enter one of the following commands:" +
        "'my-tweets', 'spotify-this-song <song name here>'," +
        "'movie-this <movie name here>', or 'do-what-it-says.'");
    break;

    // Get Tweets
    case "my-tweets":
            client.get('statuses/home_timeline', {
                count: 20
            },
            (err, data, response) => {
                if (err) {
                    console.log(err);
                } else {
                    data.forEach(t => {
                        console.log(t.user.name);
                        console.log(t.user.screen_name);
                        console.log(t.text);
                        console.log(t.created_at);
                        console.log('\n');
                    });
                }
            });
        break;

    // Get Spotify Song Search
    case "spotify-this-song":
            spotify.search({
            type: 'track',
            query: userInput
        }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            console.log(data.tracks.items[1].name);
            console.log(data.tracks.items[1].album.name);
            console.log("Artists Name:" + data.tracks.items[1].artists[0].name);
        });
        break;

    // Get OMDB Movie Search
    case "movie-this":
        // Store all of the arguments in an array
        var nodeArgs = process.argv;

        // Create an empty variable for holding the movie name
        var movieName = "";

        // Loop through all the words in the node argument
        // handle the inclusion of "+"s
        for (var i = 2; i < nodeArgs.length; i++) {
            if (i > 2 && i < nodeArgs.length) {
                movieName = nodeArgs[i];
            } else {
                movieName += nodeArgs[i];
            }
        }

        var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";

        request(queryUrl, function (error, response, body) {
            if (!error) {
                console.log('\n');
                console.log("Title: " + JSON.parse(body).Title);
                console.log("Year: " + JSON.parse(body).Year);
                console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
                console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Metascore);
                console.log("Country Produced: " + JSON.parse(body).Country);
                console.log("Language: " + JSON.parse(body).Language);
                console.log('\n');
                console.log("Plot: " + JSON.parse(body).Plot);
                console.log('\n');
                console.log("Actors: " + JSON.parse(body).Actors);
                console.log('\n');
            }
        });
        break;

    // Get pre-set command from random.txt
    case "do-what-it-says":
            fs.readFile("random.txt", "utf8", function (error, data) {

            // If the code experiences any errors it will log the error to the console.
            if (error) {
                return console.log(error);
            }

            // We will then print the contents of data
            console.log(data);

            // Then split it by commas (to make it more readable)
            var dataArr = data.split(",");

            // We will then re-display the content as an array for later use.
            console.log(dataArr);

            spotify.search({
                type: 'track',
                query: dataArr[1]
            }, function (err, data) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                }
                console.log(data.tracks.items[1].name);
                console.log(data.tracks.items[1].album.name);
                console.log("Artists Name: " + data.tracks.items[1].artists[0].name);
            });
        });
}