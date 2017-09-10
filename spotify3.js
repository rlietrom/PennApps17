var tracks = require('./spotify2.js')

console.log(tracks)


// var urls = []
// var countrySongIds = []
// var promises = []
//
//
// tracks.forEach((song) => {
//   countrySongIds.push(song.id)
// })
//
// countrySongIds.forEach((id) => {
//   urls.push("https://api.spotify.com/v1/audio-features/"+id)
// })
//
// urls.forEach((url)=> {
//   promises.push(fetch(url, {
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
// })
//
//
// Promise
//   .all(promises)
//   .then(response => {
//     console.log(response)
//   })
