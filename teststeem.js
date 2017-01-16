var MongoClient = require('mongodb').MongoClient
var assert = require('assert');
var express = require('express')
var bodyParser = require('body-parser')

var app = express()
app.use(bodyParser.json())

app.get('/api/history', function(req, res, next) {
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
			//'account': 'gutzofter',
			'type': 'transfer',
			'to': 'msteem',
			'timestamp': { '$gte': new Date('2017-01-06T21:25:21.000Z') }
		}).toArray(function(err, docs) {
			if(!err){
				db.close()
				console.log("MongoDb [D]")
				var links = []
				docs.forEach(function(value){
					var link = parseMemo2Link(value.memo)
					console.log(link)
					links.push(link)
				})
			
				callback(links)	
			}
		})
	})
}
	// "type" : "bookmark",
	// "action" : "add",
	// "version" : "00",
	
var parseMemo2Link = function(memo){
	var link = {}
	if(memo.type == 'bookmark' && memo.action == 'add' && memo.version == '00' )
	{
		link['link'] = memo.link
		link['comment'] = memo.content
	}
	
	return link
}

app.listen(3000, function() {
	console.log('Server: ', 3000)
})



