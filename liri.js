
var request = require("request");
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var inquirer = require("inquirer");
var fs = require("fs");

var mediaKeys = require("./keys.js");

var userTwitter = mediaKeys.twitterKeys;
var userSpotify = mediaKeys.spotifyKeys;