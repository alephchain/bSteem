var MongoClient = require('mongodb').MongoClient
var assert = require('assert');
var express = require('express')
var bodyParser = require('body-parser')

var app = express()
app.use(bodyParser.json())

app.get('/api/nullhistory', function(req, res, next) {
	findTransfers(function(ops) {
		console.log("Found: " + ops.length);
		res.json(ops)
	})	
})

var findTransfers = function(callback) {
	var uri = 'mongodb://steemit:steemit@mongo0.steemdata.com/Steem'

	MongoClient.connect(uri, function(err, db) {
		assert.equal(null, err);
		
		console.log("MongoDb [C]");

		db.collection('VirtualOperations').find({
			'type': 'transfer',
			'to': 'null',
			//'timestamp': { '$gte': new Date('2017-01-01') }
		}).toArray(function(err, docs) {
			if(!err){
				db.close()
				console.log("MongoDb [D]")
				
				var payments = []

				docs.forEach(function(value){	

					var payment = parseNullPayment(value._id, value.timestamp, value.from, value.amount)
					
					if(!isEmptyObject(payment))
					{
						payments.push(payment)
					}
				})
			
				callback(payments)	
			}
		})
	})
}

var parseNullPayment = function(id, timestamp, from, amount) {
	var payment = {}

	var tokens = amount.split(" ")


	payment['id'] = id
	payment['from'] = from
	payment['amount'] = Number(tokens[0])
	payment['token_type'] = tokens[1]
	payment['timestamp'] = timestamp

	return payment
}
	// "type" : "bookmark",
	// "action" : "add",
	// "version" : "00",
	

function isEmptyObject(obj) {
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      return false;
    }
  }
  return true;
}
app.listen(3000, function() {
	console.log('Server: ', 3000)
})



