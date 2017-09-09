var request = require('request');
var rp = require('request-promise');
var payload = process.env.SPOTIFY_CLIENT_ID + ":" + process.env.SPOTIFY_CLIENT_SECRET;
var encodedPayload = new Buffer(payload).toString("base64");

var opts = {
    url: "https://accounts.spotify.com/api/token",
    method: "POST",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Basic " + encodedPayload
    },
    body: "grant_type=client_credentials"
};

var token;

rp(opts, function (err, res, body) {
  console.log('status', res.statusCode);
}).then((response) => {
  console.log('body', JSON.parse(response));
  var parsedBody = JSON.parse(response)
  token = parsedBody['access_token'];
}).catch(err=> {
  console.log(err.message)
})

module.exports = { token: token }
