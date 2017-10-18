# LIRI (Personal Assistant) Node Application
### By Garrett Moore

## Application
Hello! Welcome to LIRI! LIRI is a command line node app that takes in user parameters and gives you back the data you requested. LIRI is built using node.js and uses Twitter, Spotify,and OMDB API's.

Node Packages Used: Twitter, Spotify, Request.

## Installation
1. Download the appropriate npm packages by running npm install.
2. Make sure you copy and paste your Twitter keys in the keys.js file. You will need the following:
    1. consumer_key
    2. consumer_secret
    3. access_token_key
    4. access_token_secret
3. Make sure you copy and paste your Spotify keys in the keys.js file. You will need the following:
    1. client_id
    2. client_secret
4. After you've added your keys, you can now run a command. LIRI knows 4 commands.
    1. my-tweets
    2. spotify-this-song 'song name here'
    3. movie-this 'movie name here'
    4. do-what-it-says
5. To use LIRI, open up your terminal and type 'node liri.js "whatever command you choose" in the command line.

## Commmand 1 - my-tweets
1. Running this command in your terminal/bash window will display your most recent tweets and when they were created.

![my-tweets](/images/my-tweets.png)

## Command 2 - spotify-this-song 'song name here'
1. Running this command will display the following information about the song in your terminal/bash window:
    1. The song's title.
    2. The album that the song is from.
    3. Artist(s).

![spotify-this-song](/images/spotify-this-song.png)

## Command 3 - movie-this 'movie name here'
1. Running this command will output the following information to your terminal/bash window:
    1. Title of the movie.
    2. Year the movie came out.
    3. IMDB Rating of the movie.
    4. Metascore Rating of the movie.
    5. Country where the movie was produced.
    6. Language of the movie.
    7. Plot of the movie.
    8. Actors in the movie.

![movie-this](/images/movie-this.png)

2. Note: OMDB API requires an API key. The API Key is provided for you.

## Command 4 - do-what-it-says
1. Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

![do-what-it-says](/images/do-what-it-says.png)

2. It should run spotify-this-song for "I Want it That Way," as it follows the provided text in random.txt.

## End
Thank you for using LIRI Personal Assistant! Please contact me directly if you have any questions or suggestions.

https://github.com/garrettmmoore