let dotenv = require('dotenv').config(); //node package to read private files
let keys = require('./keys.js'); // Grab data from keys.js
let fs = require('fs'); // node package for reading and writing files
let Spotify = require('node-spotify-api'); // node package that handles Spotify requests
let axios = require('axios'); //node package for axios
let moment = require('moment');

let command = process.argv[2];
// Get all elements in process.argv, starting from index 3 to the end
// Join them into a string to get the space delimited address
let args = process.argv.slice(3).join(' ');

liri(command, args);

function liri(command, arg) {
  switch (command) {
    case 'concert-this':
      bandMe(arg);
      break;

    case 'spotify-this-song':
      spotMe(args);
      break;

    case 'movie-this':
      movieMe(args);
      break;

    case 'do-what-it-says':
      doMe();
      break;
    default:
      console.log(
        '\nEnter: node liri.js do-what-it-says or movie-this (w a movie title) or spotify-this-song (w a song title / artist) or concert-this (band / artist name),  \n'
      );
  }
}

function spotMe(arg) {
  var spotify = new Spotify(keys.spotify);

  var song = arg;

  if (song) {
    var params = { type: 'track', query: song, limit: 20 }; // gets 20 results from search

    spotify.search(params, getSong);
  } else {
    spotify.search(
      { type: 'track', query: 'never gonna give you up rick astley' },
      getSong
    );
  }
}

function getSong(err, data) {
  if (err) {
    return console.log('this error has occurred: ' + err);
  }

  for (let i = 0; i < data.tracks.items.length; i++) {
    let songData = data.tracks.items[i];
    let artist = songData.artists[0].name;
    let song = songData.name;
    let preview = songData.external_urls.spotify;
    let album = songData.album.name;

    console.log('~~~~~~~~~~~~~~~~');
    console.log('Song number: ', +(i + 1));
    console.log('~~~~~~~~~~~~~~~~');
    console.log('Artist(s): ', artist);
    console.log("Song's name: ", song);
    console.log('Preview link: ', preview);
    console.log('Album: ', album);

    fs.appendFileSync(
      'liri-log.txt',
      `\r\n~~~~~~~~~~~~~~~~\r\n Song number ${i +
        1} \r\n~~~~~~~~~~~~~~~~\r\n Artist(s): ${artist} \r\n Song\'s name: ${song} \r\n Preview link: ${preview} \r\n Album: ${album}\r\n`
    );
  }
  let now = moment().unix();
  fs.appendFileSync(
    'liri-log.txt',
    `\r\n~~~~~~~~~~~~~~~~END LIRI SPOTIFY REQUEST ${now}~~~~~~~~~~~~~~~~\r\n`
  );
}

function movieMe(arg) {
  if (arg) {
    // Then run a request with axios to the OMDB API with the movie specified
    var queryUrl = `http://www.omdbapi.com/?t=${arg}&y=&plot=short&tomatoes=true&apikey=trilogy`;
  } else {
    var queryUrl = 
      'http://www.omdbapi.com/?t=' +
      'mr+nobody' +
      '&y=&plot=short&tomatoes=true&apikey=trilogy';
  }
  // This line is just to help us debug against the actual URL.
  console.log(queryUrl);

  axios
    .get(queryUrl)
    .then(function(response) {
      // console.log(JSON.stringify(response.data, null, 2));

      let title = response.data.Title;
      let year = response.data.Year;
      let rating = response.data.imdbRating;
      let tomato = response.data.tomatoRating;
      let country = response.data.Country;
      let language = response.data.Language;
      let plot = response.data.Plot;
      let actors = response.data.Actors;

      console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
      console.log('Title of the movie: ', title);
      console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
      console.log('Year the movie came out: ', year);
      console.log('IMDB Rating: ', rating);
      console.log('Rotten Tomatoes Rating: ', tomato);
      console.log('Country where the movie was produced: ', country);
      console.log('Language of the movie: ', language);
      console.log('Plot: ', plot);
      console.log('Actor(s) in the movie: ', actors);

      fs.appendFileSync(
        'liri-log.txt',
        `\r\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\r\n Title of the movie: ${title} \r\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\r\n Year the movie came out: ${year} \r\n IMDB Rating: ${rating} \r\n Rotten Tomatoes Rating: ${tomato} \r\n Country where the movie was produced: ${country} \r\n Language of the movie: ${language} \r\n Plot: ${plot} \r\n Actor(s) in the movie: ${actors} \r\n`
      );
      let now = moment().unix();
      fs.appendFileSync(
        'liri-log.txt',
        `\r\n~~~~~~~~~~~~~~~~END LIRI OMDB REQUEST ${now}~~~~~~~~~~~~~~~~\r\n`
      );
    })
    .catch(function(err) {
      console.log(err);
    });
}

function doMe() {
  fs.readFile('random.txt', 'utf8', function(err, file) {
    if (err) {
      return console.log(err);
    }

    let fileArr = file.split(',');
    let cmd = fileArr[0];
    // console.log('cmd: ', cmd);
    let arg = fileArr[1];
    // console.log('arg: ', arg);
    liri(cmd, arg);
  });
}

function bandMe(arg) {
  if (arg) {
    // Then run a request with axios to the Bands In Town Artist Events API with the band specified
    var queryUrl = `https://rest.bandsintown.com/artists/${arg}/events?app_id=codingbootcamp`;
  } else {
    var queryUrl =
      'https://rest.bandsintown.com/artists/' +
      'pink' +
      '/events?app_id=codingbootcamp';
  }
  // This line is just to help us debug against the actual URL.
  //  console.log(queryUrl);

  axios
    .get(queryUrl)
    .then(function(response) {
      // console.log(JSON.stringify(response.data, null, 2));
      if (response.data.constructor != String) {
        for (let i = 0; i < response.data.length; i++) {
          let venues = response.data;
          let artist = venues[i].lineup;
          let venue = venues[i].venue.name;
          let location = venues[i].venue.city;
          let time = moment(venues[i].datetime).format('dddd, MMMM Do YYYY');
          // if (venues.venue) {
          console.log('~~~~~~~~~~~~~~~~~~~~~~');
          console.log('Event Artist: ', artist);
          console.log('~~~~~~~~~~~~~~~~~~~~~~');
          console.log('Event Venue: ', venue);
          console.log('Event Location: ', location);
          console.log('Event Date & Time: ', time);

          fs.appendFileSync(
            'liri-log.txt',
            `\r\n~~~~~~~~~~~~~~~~~~~~~~\r\n Event Artist: ${artist} \r\n~~~~~~~~~~~~~~~~~~~~~~\r\n Event Venue: ${venue} \r\n Event Location: ${location} \r\n Event Date & Time: ${time} \r\n`
          );
        }
      } else {
        console.log('No results found.');
      }
      let now = moment().unix();
      fs.appendFileSync(
        'liri-log.txt',
        `\r\n~~~~~~~~~~~~~~~~END LIRI BAND REQUEST ${now}~~~~~~~~~~~~~~~~\r\n`
      );
    })
    .catch(function(err) {
      console.log(err);
    });
}
