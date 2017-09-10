var express = require('express');
var router = express.Router();
var getLyrics = require('../scraper');
var getWords = require('../counter');

router.get('/', function(req, res, next) {
	res.render('home', { title: 'Express'});
});

router.get('/lyrics', getLyrics, getWords, function(req, res) {

	var out = res.locals.words;

	console.log('out is: ', res.locals.words);

	//var jsonOut = JSON.parse(out);

	//console.log('jsonOut is: ', jsonOut);

	res.render('lyrics', {
		words: out
	});
});

router.get('')

module.exports = router;