var mongoose = require('mongoose');

var playlistSchema = mongoose.Schema({
  country: String,
  tracks: Array,
});

var statsSchema = mongoose.Schema({
  country: String,
  stats: Object,
})



Playlist = mongoose.model('Playlist', playlistSchema);
Stats = mongoose.model('Stats', statsSchema)

module.exports = {
    Playlist: Playlist,
    Stats: Stats
};
