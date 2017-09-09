const phantom = require('phantom')

var sitepage = null;
var phInstance = null;

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
      // var div = document.querySelectorAll('col-xs-12 col-lg-8 text-center')
      var div = document.getElementsByClassName('lyrics');
      if (div === null) {

      } else {
        var div2 = div.text();
      }
      return div2;
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
