var mongoose = require('mongoose');
mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGODB_URI);

var models = require('./models');
var Stats = models.Stats
var Playlist = models.Playlist

var current;
var statsObj = {
  duration : [],
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
  danceability: []
}

Playlist.findOne({country: 'global'}, function(err, doc) {
  current = doc.tracks
}).then(()=> {
   current.forEach((track) => {
     statsObj.duration.push(parseInt(track.audioFeatures.duration_ms))
     statsObj.time_signature.push(track.audioFeatures.time_signature)
     statsObj.tempo.push(track.audioFeatures.tempo)
     statsObj.valence.push(track.audioFeatures.valence)
     statsObj.liveness.push(track.audioFeatures.liveness)
     statsObj.instrumentalness.push(track.audioFeatures.instrumentalness)
     statsObj.acousticness.push(track.audioFeatures.acousticness)
     statsObj.speechiness.push(track.audioFeatures.speechiness)
     statsObj.loudness.push(track.audioFeatures.loudness)
     statsObj.key.push(track.audioFeatures.key)
     statsObj.energy.push(track.audioFeatures.energy)
     statsObj.danceability.push(track.audioFeatures.danceability)
   })
   return;
}).then(()=> {
    statsObj['duration'].reduce((total, amount) => {
      return a + b;
    })
    console.log(statsObj['duration'])
  return;
})

mongoose.disconnect()
