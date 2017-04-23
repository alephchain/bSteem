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

app.get('/api/active_posts', function(req, res, next) {
	activePosts(function(posts){
		console.log("Found: " + posts.length)
		res.json(posts)
	})
})

var activePosts = function(callback) {
	var uri = 'mongodb://steemit:steemit@mongo1.steemdata.com/SteemData'

	MongoClient.connect(uri, function(err, db) {
		assert.equal(null, err);		
		console.log("MongoDb [C]");

		var dateNow =  new Date();

		var sevenDays = (24*60*60*1000) * 7

		console.log("Now: " + dateNow)
		console.log("Offset: " + new Date(dateNow.setTime(dateNow.getTime() - sevenDays)))

		db.collection('Posts').aggregate({ $match: { created: { $gte: new Date(dateNow.setTime(dateNow.getTime() - sevenDays)) }}},
			{ $project: {
				created: 1, 
				url: 1, 
				tags: '$json_metadata.tags', 
				links: '$json_metadata.links'
			}}).toArray(function(err, docs) {
				db.close()
				console.log("MongoDb [D]")

				callback(docs)

			})
	})

}

var findTransfers = function(callback) {
	var uri = 'mongodb://steemit:steemit@mongo1.steemdata.com/SteemData'

	MongoClient.connect(uri, function(err, db) {
		assert.equal(null, err);
		
		console.log("MongoDb [C]");

		db.collection('Operations').find({
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
					var jsonMemo = safelyParseJSON(value.memo)

					var link = parseMemo2Link(value._id, value.timestamp, value.from, jsonMemo)
					
					if(!isEmptyObject(link))
					{
						links.push(link)
					}
				})
			
				callback(links)	
			}
		})
	})
}
	// "type" : "bookmark",
	// "action" : "add",
	// "version" : "00",
	
var parseMemo2Link = function(id, timestamp, from, memo){
	var link = {}

	if(memo.type == 'bookmark' && memo.action == 'add' && memo.version == '00' )
	{
		link['id'] = id
		link['from'] = from
		link['link'] = memo.link
		link['comment'] = memo.comment
		link['timestamp'] = timestamp
	}
	
	return link
}

function safelyParseJSON (json) {
	var parsed = {}

	try {
		parsed = JSON.parse(json)
	} catch (e) {
		// Oh well, but whatever...
	}

	return parsed // Could be undefined!
}

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



