# liri the bot

### Overview

LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a _Language_ Interpretation and Recognition Interface. LIRI is a command line Node.js app that takes in parameters and gives you back data.

Make it so liri.js can take in one of the following commands:

   * `concert-this`

   * `spotify-this-song`

   * `movie-this`

   * `do-what-it-says`

## concert-this [artist/band name]
    * This will search the Bands in Town Artist Events API (`"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"`) for an artist and render the following information about each event to the terminal:

     * Name of the venue

     * Venue location

     * Date of the Event (use moment to format this as "MM/DD/YYYY")

## spotify-this-song [song name]
    * This will show the following information about the song in your terminal/bash window
'''
        * Artist(s)
        * The song's name
        * A preview link of the song from Spotify
        * The album that the song is from
'''
    * if no song is provided then your program will default to
        * "Never Gonna Give You Up" by Sir Richard Astley

## movie-this [movie-name]
    * This will output the following information to your terminal/bash window:
'''
        * Title of the movie.
        * Year the movie came out.
        * IMDB Rating of the movie.
        * Country where the movie was produced.
        * Language of the movie.
        * Plot of the movie.
        * Actors in the movie.
        * Rotten Tomatoes Rating.
        * Rotten Tomatoes URL.
'''
    * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

## do-what-it-says
    Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
    *It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
    *Edit the text in random.txt to test out the feature for movie-this and concert-this.

## Additional
    In addition to logging the data to your terminal/bash window, output the data to a .txt file called liri-log.txt.
     
## Links to Liri's Video Proof of working order that Trevor told me I had to upload...
[liri-node-run](https://bootcampkevin.github.io/liri/index.html#secondSection)
[liri-concert-this](https://bootcampkevin.github.io/liri/index.html#thirdSection)
[liri-spotify-this-song](https://bootcampkevin.github.io/liri/index.html#fourthSection)
[liri-movie-this](https://bootcampkevin.github.io/liri/index.html#fifthSection)
[liri-do-what-it-says](https://bootcampkevin.github.io/liri/index.html#lastSection)
