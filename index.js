var Nightmare = require('nightmare');		
var nightmare = Nightmare({ show: true });
var MongoClient = require('mongodb').MongoClient



// nightmareCode(coin1,coin2,amount)
//nightmareCode('BTC','USD',22)


// ===============NIGHTMARE CODE=======================


function nightmareCode(coin1,coin2,amount){
nightmare
  .goto('http://localhost:8000')
 
  .select('body > div.container.row > div:nth-child(1) > div > input', coin1)
  .select('body > div.container.row > div:nth-child(2) > div > input', coin2)
  .type('body > div.container.row > input', amount)
  //.click('body > div.container.row > button')
  .then(function(){
  	mongoDbCode(coin1, coin2,amount)
  })
  .catch(function (error) {
    console.error('Search failed:', error);
  });
}



// ===============MONGODB CODE=======================
mongoDbCode('BTC','USD',22)


function mongoDbCode(coin1, coin2,amount){
	// Connection URL
	var url = 'mongodb://localhost:27017/test';

	// Use connect method to connect to the server
	MongoClient.connect(url, function(err, db) {

	  //Insert data
	  db.collection('botCollections').insertMany([{coin1:coin1, coin2:coin2, amount:amount, date:Date()}])


	});
}