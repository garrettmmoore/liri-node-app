// Include NPM packages
var request = require("request");
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var inquirer = require("inquirer");
var fs = require("fs");

// Grab the api keys from the .keys file
// var mediaKeys = require("./keys.js");

// Store api keys in variables
// var client = mediaKeys.twitterKeys;
// console.log(userTwitter);


var client = new Twitter({
    consumer_key: '5rQYexogqXqv1ve8hYR6SO2Mr',
    consumer_secret: 'hAom1cekGlvaXgD1DmXXhGzOaDyWAdUM74nXHCbeNJl5MFcNrp',
    access_token_key: '899018269633331200-AzsGioEoIsNTmpFvc9xYaB7Dtzqt5JV',
    access_token_secret: 'D1sURvd3Yqvh2pTOORHTErKu6aYl6shPpVOa175P2MkhF'
});

var spotify = new Spotify({
    id:'5fcada95ee784c2f996ad60d23127970',
    secret:'8e1ec6918e454b06928a52a48282cb08'
  });


// var userSpotify = mediaKeys.spotifyKeys;
// console.log(userSpotify);

var commands = process.argv[2];
var userInput = process.argv[3];

switch(commands)
{
    default:
        console.log("You've entered an incorrect command" +
        "Please enter 'my-tweets', 'spotify-this-song', 'movie-this', or 'do-what-it-says.'");
        break;
    case "my-tweets":
        client.get('statuses/home_timeline', 
        {
            count: 20
        }, 
        (err, data, response) => 
        {
            if (err) 
            {
                console.log(err);
            } 
            else 
            {
                data.forEach(t => 
                {
                    console.log(t.user.name);
                    console.log(t.user.screen_name);
                    console.log(t.text);
                    console.log(t.created_at);
                    console.log('\n');
                });
            }
        });
        break;
    case "spotify-this-song":
        spotify.search({ type: 'track', query: userInput }, function(err, data) 
        {
            if (err) 
            {
                return console.log('Error occurred: ' + err);
            }
            console.log(data.tracks.items[1].name);
            console.log(data.tracks.items[1].album.name);
            console.log("Artists Name:" + data.tracks.items[1].artists[0].name); 
        });        
        break;

    case "movie-this":
        // Store all of the arguments in an array
        var nodeArgs = process.argv;

        // Create an empty variable for holding the movie name
        var movieName = "";

        // Loop through all the words in the node argument
        // handle the inclusion of "+"s
        for (var i = 2; i < nodeArgs.length; i++) 
        {
            if (i > 2 && i < nodeArgs.length) 
            {
                movieName = nodeArgs[i];
            }
            else 
            {
                movieName += nodeArgs[i];
            }
        }

        var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";

        request(queryUrl, function(error, response, body) 
        {
            if (!error && response.statusCode === 200) 
            {
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
}


// fs.readFile("movies.txt", "utf8", function(error, data) {
    
//       // If the code experiences any errors it will log the error to the console.
//       if (error) {
//         return console.log(error);
//       }
    
//       // We will then print the contents of data
//       console.log(data);
    
//       // Then split it by commas (to make it more readable)
//       var dataArr = data.split(",");
    
//       // We will then re-display the content as an array for later use.
//       console.log(dataArr);
    
//     });