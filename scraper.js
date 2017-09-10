const phantom = require('phantom')

var sitepage = null;
var phInstance = null;


/*
phantom.create()
.then(instance => {
  phInstance = instance;
  return instance.createPage();
})
.then(page => {
  sitepage = page
  return sitepage.open('https://genius.com/Zayn-dusk-till-dawn-lyrics')
})
.then(status => {
  // console.log('STATUS', status)
  if(status === 'success') {
    sitepage.evaluate(function(){
      console.log('getting lyrics...');
      var div = document.getElementsByClassName('lyrics')[0].outerText;
      div = div.replace(/\[(.+?)\]/g, '');
      return div;
    })
    .then((div) => {
      console.log('DIV', div)
      phInstance.exit();
    })
  }
})
.catch(error => {
  console.log(error);
});
*/


/*
var countWords = function (req, res, next) {
  console.log('counting words');
  var words = {
    word: 'hello'
  };
  var word = 'hello';
  res.render('/lyrics', word);
}*/





var getLyrics = function (req, res, next) {



  phantom.create()
  .then(instance => {
    phInstance = instance;
    return instance.createPage();
  })
  .then(page => {
    sitepage = page
    return sitepage.open('https://genius.com/Zayn-dusk-till-dawn-lyrics');
  })
  .then(status => {
    // console.log('STATUS', status)
    if(status === 'success') {
      sitepage.evaluate(function(){
        console.log('getting lyrics...');
        var div = document.getElementsByClassName('lyrics')[0].outerText;
        div = div.replace(/\[(.+?)\]/g, '');
        return div;
      })
      .then((div) => {


        //console.log('DIV', div);
        res.locals.lyrics = div;

        var topWords = [
        'Love', 
        'My', 
        'Body'
        ];
        
        res.locals.words = topWords;
        next();
        phInstance.exit();
      })
    }
  })
  .catch(error => {
    console.log(error);
  });
}

module.exports = getLyrics;

