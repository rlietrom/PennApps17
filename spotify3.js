var mongoose = require('mongoose');
mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGODB_URI);
var fetch = require('isomorphic-fetch')

var models = require('./models');
var token = "BQBoWGo8vGLpbbzhRHc2prudKc_hsP797BuWCeQe0HyAaagr9WAAv8NI6X5CjarXVYJvHfZ1mUQzylCWvSME7w"

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
var trackURLs = []
var promises = []
Playlist.findOne({country: 'panama'}, function (err, doc) {
  current = doc.tracks
}).then(()=> {
  current.forEach((song) => {
    trackURLs.push('https://api.spotify.com/v1/audio-features/'+song.id)
  })
  return;
}).then(()=> {
  trackURLs.forEach(url => {
    promises.push(fetch(url, {
      method: 'GET',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Bearer " + token
      }
    }).then(response => {
      return response.json()
    }).then(resp => {
      return resp;
    })
    .catch(err => {
      console.log(err.message)
    }))
})
return;
}).then(()=> {
  Promise.all(promises)
  .then(resp => {
    for (var i=0; i<resp.length; i++) {
      current[i].audioFeatures = resp[i]
    }
    console.log(resp)
    return;
  }).then(()=> {
  Playlist.findOneAndUpdate({country: 'panama'}, {tracks: current}, function(err, doc) {
    if(err) {
      console.log(err)
    }
    console.log(doc)
    return;
  })
  return;
})
return;
})







// var trackURLs = []
//   var promises2 = []
//   tracks.global.forEach((song) => {
//     trackURLs.push('https://api.spotify.com/v1/audio-features/'+song.id)
//   })
  // trackURLs.forEach(url => {
  //   promises2.push(fetch(url, {
  //     method: 'GET',
  //     headers: {
  //       "Content-Type": "application/x-www-form-urlencoded",
  //       "Authorization": "Bearer " + token
  //     }
  //   }).then(response => {
  //     return response.json()
  //   }).then(resp => {
  //     return resp;
  //   })
  //   .catch(err => {
  //     console.log(err.message)
  //   }))
//   })
//
//   Promise
//   .all(promises2)
//   .then(resp => {
//     for (var k=0; k< resp.length; k++) {
//       tracks.global.forEach((song) => {
//         song.audioFeatures = resp[k]
//       })
//     }
//     return;
//   })
