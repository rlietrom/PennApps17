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
