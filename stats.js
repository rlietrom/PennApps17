var mongoose = require('mongoose');
mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGODB_URI);

var models = require('./models');
var Stats = models.Stats
var Playlist = models.Playlist

var playlists = {
  global: "37i9dQZEVXbMDoHDwVN2tF",
  argentina: "37i9dQZEVXbMMy2roB9myp",
  australia: "37i9dQZEVXbJPcfkRz0wJ0",
  austria: "37i9dQZEVXbKNHh6NIXu36",
  belgium: "37i9dQZEVXbJNSeeHswcKB",
  bolivia: "37i9dQZEVXbJqfMFK4d691",
  brazil: "37i9dQZEVXbMXbN3EUUhlg",
  canada: "37i9dQZEVXbKj23U1GF4IR",
  chile: "37i9dQZEVXbL0GavIqMTeb",
  colombia: "37i9dQZEVXbOa2lmxNORXQ",
  costarica: "37i9dQZEVXbMZAjGMynsQX",
  czechrepublic: "37i9dQZEVXbIP3c3fqVrJY",
  denmark: "37i9dQZEVXbL3J0k32lWnN",
  dominicanrepublic: "37i9dQZEVXbKAbrMR8uuf7",
  ecuador: "37i9dQZEVXbJlM6nvL1nD1",
  elsalvador: "37i9dQZEVXbLxoIml4MYkT",
  estonia: "37i9dQZEVXbLesry2Qw2xS",
  finland: "37i9dQZEVXbMxcczTSoGwZ",
  france: "37i9dQZEVXbIPWwFssbupI",
  germany: "37i9dQZEVXbJiZcmkrIHGU",
  greece: "37i9dQZEVXbJqdarpmTJDL",
  guatemala: "37i9dQZEVXbLy5tBFyQvd4",
  honduras: "37i9dQZEVXbJp9wcIM9Eo5",
  hongkong: "37i9dQZEVXbLwpL8TjsxOG",
  hungary: "37i9dQZEVXbNHwMxAkvmF8",
  iceland: "37i9dQZEVXbKMzVsSGQ49S",
  indonesia: "37i9dQZEVXbKMzVsSGQ49S",
  ireland: "37i9dQZEVXbKMzVsSGQ49S",
  italy: "37i9dQZEVXbIQnj7RRhdSX",
  japan: "37i9dQZEVXbKXQ4mDTEBXq",
  latvia: "37i9dQZEVXbJWuzDrTxbKS",
  lithuania: "37i9dQZEVXbMx56Rdq5lwc",
  malaysia: "37i9dQZEVXbJlfUljuZExa",
  mexico: "37i9dQZEVXbO3qyFxbkOE1",
  netherlands: "37i9dQZEVXbKCF6dqVpDkS",
  newzealand: "37i9dQZEVXbM8SIrkERIYl",
  norway: "37i9dQZEVXbJvfa0Yxg7E7",
  panama: "37i9dQZEVXbKypXHVwk1f0",
  paraguay: "37i9dQZEVXbNOUPGj7tW6T",
  peru: "37i9dQZEVXbJfdy5b0KP7W",
  phillipines: "37i9dQZEVXbNBz9cRCSFkY",
  poland: "37i9dQZEVXbN6itCcaL3Tt",
  portugal: "37i9dQZEVXbKyJS56d1pgi",
  singapore: "37i9dQZEVXbK4gjvS1FjPY",
  slovakia: "37i9dQZEVXbKIVTPX9a2Sb",
  spain: "37i9dQZEVXbNFJfN1Vw8d9",
  sweden: "37i9dQZEVXbLoATJ81JYXz",
  switzerland: "37i9dQZEVXbJiyhoAPEfMK",
  taiwan: "37i9dQZEVXbMnZEatlMSiu",
  thailand: "37i9dQZEVXbMnz8KIWsvf9",
  turkey: "37i9dQZEVXbIVYVBNw9D5K",
  unitedkingdom: "37i9dQZEVXbLnolsZ8PSNw",
  unitedstates: "37i9dQZEVXbLRQDuF5jeBp",
  uruguay: "37i9dQZEVXbMJJi3wgRbAy"
}



var current;
var trackStats = {
  duration: [],
  time_signature: [],
  tempo: [],
  valence: [],
  liveness: [],
  instrumentalness: [],
  acousticness: [],
  speechiness: [],
  loudness: [],
  key: [],
  energy: [],
  danceability:[]
}

Playlist.findOne({country: 'germany'}, function(err, doc) {
  current = doc.tracks
}).then(()=> {
   current.forEach((track) => {
     trackStats.duration.push(parseFloat(track.audioFeatures.duration_ms))
     trackStats.time_signature.push(parseFloat(track.audioFeatures.time_signature))
     trackStats.tempo.push(parseFloat(track.audioFeatures.tempo))
     trackStats.valence.push(parseFloat(track.audioFeatures.valence))
     trackStats.liveness.push(parseFloat(track.audioFeatures.liveness))
     trackStats.instrumentalness.push(parseFloat(track.audioFeatures.instrumentalness))
     trackStats.acousticness.push(parseFloat(track.audioFeatures.acousticness))
     trackStats.speechiness.push(parseFloat(track.audioFeatures.speechiness))
     trackStats.loudness.push(parseFloat(track.audioFeatures.loudness))
     trackStats.key.push(parseFloat(track.audioFeatures.key))
     trackStats.energy.push(parseFloat(track.audioFeatures.energy))
     trackStats.danceability.push(parseFloat(track.audioFeatures.danceability))
   })
}).then(()=> {
  for (var key in trackStats) {
    var length = trackStats[key].length
    var sum = trackStats[key].reduce((a,b) => {
      return a + b;
    },0)
    trackStats[key] = sum/length
  }
  return trackStats;
}).then((trackStats) => {
  var newStats = new Stats ({
    country: 'germany',
    stats: trackStats
  }).save(function(err) {
    if (err) {
      console.log(err)
    }
  })
  return;
})
