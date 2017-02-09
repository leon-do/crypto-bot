var Nightmare = require('nightmare');		
var nightmare = Nightmare({ show: true });

var coin1 = "BTC"
var coin2 = "USD"
var amount = 33;

nightmare
  .goto('http://localhost:8000')
 
  .select('body > div.container.row > div:nth-child(1) > div > input', coin1)
  .select('body > div.container.row > div:nth-child(2) > div > input', coin2)
  .type('body > div.container.row > input', amount)
  //.click('body > div.container.row > button')

  .catch(function (error) {
    console.error('Search failed:', error);
  });