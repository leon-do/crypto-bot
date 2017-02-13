var Nightmare = require('nightmare');		
var nightmare = Nightmare({ show: true });
var MongoClient = require('mongodb').MongoClient
var Twitter = require('twitter');
var AYLIENTextAPI = require('aylien_textapi');
var tokens = require('./tokens.js')




// =======================TWITTER==================================


//var used to collect the stream
var tweet;


// get twitter stream
var stream = client.stream('statuses/filter', {track: 'bitcoin'});
stream.on('data', function(event) {
  tweet = event.text.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '').replace(/#/g, "").toString()
});


//send tweet every 30 sends
setInterval(function(){
  //console.log(tweet)
  analyzeText(tweet, "bitcoin")
}, 5000)





// =======================AYLIEN==================================

// passes text and coin to Aylien
function analyzeText(text, coin){
  textapi.sentiment({
    'text': text
  }, function(error, response) {
    console.log(response);
    if (response.polarity !== 'neutral'){
      tradeCrypto(response.polarity, coin)
    }
  }); 
}




// ===============SCRAPER=======================

function tradeCrypto(polarity, coin2){
  
  console.log("trade " + polarity)
  console.log("trade " + coin2)

  // scrape where my coins are at
  // <-- code here code here code here code here code here code here code here code here

  if (polarity === 'positive'){
      nightmareCode (coin1, coin2, amount)
  } else (
      nightmareCode (coin2, coin1, amount)
  )

}






// ===============NIGHTMARE=======================


function nightmareCode(coin1,coin2,amount){
nightmare
  .goto('http://localhost:8000')
 
  .select('#select_value_label_0 > span:nth-child(1) > div', coin1)
  .select('#select_value_label_1 > span:nth-child(1) > div', coin2)
  .type('body > div.container.row > input', amount)
  //.click('#transfer-button > span')
  .then(function(){
  	mongoDbCode(coin1, coin2,amount)
  })
  .catch(function (error) {
    console.error('Search failed:', error);
  });
}



// ===============MONGODB CODE=======================


function mongoDbCode(coin1, coin2,amount){
	// Connection URL
	var url = 'mongodb://localhost:27017/test';

	// Use connect method to connect to the server
	MongoClient.connect(url, function(err, db) {

	  //Insert data
	  db.collection('botCollections').insertMany([{coin1:coin1, coin2:coin2, amount:amount, date:Date()}])


	});
}