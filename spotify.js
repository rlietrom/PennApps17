// var request = require('request');
// var rp = require('request-promise');
var fetch = require('isomorphic-fetch')
var payload = process.env.SPOTIFY_CLIENT_ID + ":" + process.env.SPOTIFY_CLIENT_SECRET;
var encodedPayload = new Buffer(payload).toString("base64");


function getToken() {
  return new Promise((res, rej)=> {
    var authtoken;
    fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Basic " + encodedPayload
      },
      body: "grant_type=client_credentials"
    }).then(response => {
      return response.json()
    }).then(resp => {
      //console.log(resp)
      authtoken = resp["access_token"]
      res(authtoken)
      return authtoken
    }).catch(err => {
      console.log(err.message)
    })
  })
}

getToken()
.then(resp => console.log(resp))
