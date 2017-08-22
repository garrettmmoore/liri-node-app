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
        });        
        break;

    case "movie-this":
        break;
    case "do-what-it-says":
        break;
};



//Twitter
/**
 * Stream statuses filtered by keyword
 * number of tweets per second depends on topic popularity
 **/
// userTwitter.stream('statuses/filter', {track: 'twitter'},  function(stream) {
//     stream.on('data', function(tweet) {
//       console.log(tweet.text);
//     });
  
//     stream.on('error', function(error) {
//       console.log(error);
//     });
//   });

// //Spotify
// userSpotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
//     if (err) {
//       return console.log('Error occurred: ' + err);
//     }
   
//   console.log(data); 
//   });

// //OMDB
// // Then run a request to the OMDB API with the movie specified
// request("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=40e9cece", function(error, response, body) {
    
//       // If the request is successful (i.e. if the response status code is 200)
//       if (!error && response.statusCode === 200) {
    
//         // Parse the body of the site and recover just the imdbRating
//         // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
//         console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
//       }
//     });

// // fs
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
    